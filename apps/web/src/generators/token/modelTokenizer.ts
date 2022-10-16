import {
  getDefault,
  getDesc,
  getMax,
  getMin,
  getVirtualDefault,
  hasCreate,
  hasDefault,
  hasDelete,
  hasMax,
  hasMin,
  hasRead,
  hasUnique,
  hasUpdate,
  hasVirtualDefault,
  isClosingBracket,
  isComment,
  isIndex,
  isRequired,
  isUnique,
  isVirtualProperty,
} from './helpers'

import { Iterator } from './iterator'

type ModelType = 'model' | 'type' | 'unknown'

export interface ModelToken {
  name: string
  type: ModelType
  desc: string
  properties: PropertyToken[]
  operations: ModelOperationToken[]
}

export interface ModelOperationToken {
  name: string
  type: 'unique' | 'index'
  properties: string[]
}

export interface PropertyToken {
  name: string
  type: string
  isOptional: boolean
  isArray: boolean
  desc?: string
  default?: any
  unique?: boolean
  // nullable?: boolean
  // required?: boolean
  min?: number
  max?: number
  enum?: string[]
  operations?: PropertyOperationToken[]
}
export interface PropertyOperationToken {
  name: string
  required: boolean
  default?: any
}

const getModelName = (s: string) => {
  const regex = /(model|type)\s+(\w+)/
  const result = s.match(regex)
  const modelName = result ? result[2] : 'Unknown'
  // const modelType = result ? result[1] : 'unknown'
  const modelNameWithoutBrackets = modelName.replace(/[{}]/g, '')
  return modelNameWithoutBrackets.trim()
}

const getModelType = (s: string): ModelType => {
  const regex = /(model|type)\s+(\w+)/
  const result = s.match(regex)
  return (result ? result[1] : 'unknown') as ModelType
}

const isProperty = (s: string) => {
  return /(\w+)\s+(\w+)/.test(s.trim())
}

const hasOperations = (line: string) => {
  return line.includes('@create') || line.includes('@update') || line.includes('@delete') || line.includes('@read')
}

// get operations from line
const getPropertyOperations = (line: string): PropertyOperationToken[] => {
  const operations = line.split(' ')
  return operations
    .filter(operation => {
      return hasOperations(operation.trim())
    })
    .map(operation => {
      const operationName = operation.trim().match(/@(\w+)/)?.pop() as string
      return {
        name: operationName,
        required: isRequired(operation),
        default: hasVirtualDefault(operationName, line) ? getVirtualDefault(operationName, line) : undefined,
      }
    })
}

class PropertyTokenBuilder {
  private _desc?: string
  private _default?: any
  private _unique?: boolean
  // private _nullable?: boolean
  private _min?: number
  private _max?: number
  private _enum?: string[]
  // private _required?: boolean
  private _operations: PropertyOperationToken[] = []

  constructor(
    private name: string,
    private type: string,
    private isOptional = false,
    private isArray: boolean = false
  ) {}

  public default(v: any) {
    this._default = v
    return this
  }

  public unique(v = true) {
    this._unique = v
    return this
  }

  // public nullable(v = true) {
  //   this._nullable = v
  //   return this
  // }

  public min(v: number) {
    this._min = v
    return this
  }

  public max(v: number) {
    this._max = v
    return this
  }

  public enum(v: string[]) {
    this._enum = v
    return this
  }

  public desc(v: string) {
    this._desc = v
    return this
  }

  public operations(v: PropertyOperationToken[]) {
    this._operations = v
    return this
  }

  // public required(v = true) {
  //   this._required = v
  //   return this
  // }

  public build(): PropertyToken {
    return {
      name: this.name,
      type: this.type,
      isArray: this.isArray,
      isOptional: this.isOptional,
      desc: this._desc,
      default: this._default,
      unique: this._unique,
      // nullable: this._nullable,
      min: this._min,
      max: this._max,
      // required: this._required,
      enum: this._enum,
      operations: this._operations,
    }
  }
}

class ModelTokenBuilder {
  private _name: string
  private _type: ModelType
  private _desc: string = ''
  private _properties: PropertyToken[] = []
  private _operations: ModelOperationToken[] = []

  constructor(name: string, type: ModelType) {
    this._name = name
    this._type = type
  }

  public desc(v: string) {
    this._desc = v
    return this
  }

  public addOperation(operation: ModelOperationToken) {
    this._operations.push(operation)
    return this
  }

  public addProperty(property: PropertyToken) {
    this._properties.push(property)
  }

  public build(): ModelToken {
    return {
      name: this._name,
      type: this._type,
      desc: this._desc,
      properties: this._properties,
      operations: this._operations,
    }
  }
}

export const parseModel = (line: string, lines: Iterator<any>) => {
  const modelTokenBuilder = new ModelTokenBuilder(getModelName(line), getModelType(line))
  const prevLine = lines.peek(-1)
  if (prevLine && getDesc(prevLine.value)) {
    modelTokenBuilder.desc(getDesc(prevLine.value))
  }
  while (lines.hasNext()) {
    const line = lines.next().value
    if (isComment(line) && !isVirtualProperty(line)) {
      continue
    }

    if (isUnique(line) || isIndex(line)) {
      const uniqueProperties = line.match(/\w+/g)
      const comment = lines.peek(-1)

      if (hasCreate(comment?.value)) {
        modelTokenBuilder.addOperation({
          name: 'create',
          type: isUnique(line) ? 'unique' : 'index',
          properties: uniqueProperties.slice(1),
        })
      }

      if (hasRead(comment?.value)) {
        modelTokenBuilder.addOperation({
          name: 'read',
          type: isUnique(line) ? 'unique' : 'index',
          properties: uniqueProperties.slice(1),
        })
      }

      if (hasUpdate(comment?.value)) {
        modelTokenBuilder.addOperation({
          name: 'update',
          type: isUnique(line) ? 'unique' : 'index',
          properties: uniqueProperties.slice(1),
        })
      }

      if (hasDelete(comment?.value)) {
        modelTokenBuilder.addOperation({
          name: 'delete',
          type: isUnique(line) ? 'unique' : 'index',
          properties: uniqueProperties.slice(1),
        })
      }
    }

    if (isClosingBracket(line)) {
      break
    }

    if (isProperty(line) || isVirtualProperty(line)) {
      const [_, name, type, isOptional, isArray] = line
        .trim()
        .replace(/\/\/\s+@property\s+/g, '')
        .match(/(\w+)\s+(\w+)(\??)(\[?\]?)/)
      const prevLine = lines.peek(-1)?.value
      const propertyBuilder = new PropertyTokenBuilder(name, type, !!isOptional, !!isArray)

      if (hasUnique(line)) {
        propertyBuilder.unique()
      }

      if (hasDefault(line)) {
        propertyBuilder.default(getDefault(line))
      }

      if (hasMin(prevLine)) {
        propertyBuilder.min(getMin(prevLine))
      }

      if (hasMin(prevLine)) {
        propertyBuilder.min(getMin(prevLine))
      }

      if (hasMax(prevLine)) {
        propertyBuilder.max(getMax(prevLine))
      }

      // if (hasNullable(prevLine)) {
      //   propertyBuilder.nullable(true)
      // }

      propertyBuilder.desc(getDesc(prevLine))
      propertyBuilder.operations(getPropertyOperations(prevLine) || [])

      modelTokenBuilder.addProperty(propertyBuilder.build())
    }
  }
  return modelTokenBuilder.build()
}
