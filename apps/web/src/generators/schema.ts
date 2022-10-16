import { ModelToken, PropertyToken } from './token/modelTokenizer'

import { EnumToken } from './token/enumTokenizer'

const isString = (type: string) => {
  return type === 'String'
}

const isBool = (type: string) => {
  return type === 'Boolean'
}

const isNumber = (type: string) => {
  return type === 'Int' || type === 'Float' || type === 'BigInt'
}

const isDate = (type: string) => {
  return type === 'DateTime'
}

const isJson = (type: string) => {
  return type === 'Json'
}

// const formatDefaultArrayItems = (s: string, type: string) => {
//   const arr = s
//     .replace(/\[|\]/g, '')
//     .split(',')
//     .map((s: string) => {
//       s = `${s}`.trim()
//       if (type === 'Boolean') {
//         return s === 'true'
//       }
//       if (isNumber(type)) {
//         return Number(s)
//       }
//       return s
//     })
//   return arr
// }

const newObjectSchema = (properties?: any): any => {
  return {
    ...properties,
    type: 'object',
    default: undefined,
    // required: [] as string[],
    additionalProperties: false,
    properties: {} as any,
  }
}

const newArraySchema = (items: any = {}): any => {
  return {
    type: 'array',
    // required: [] as string[],
    // additionalProperties: false,
    items,
  }
}

const newPrimitiveSchema = (type: string, isArray = false, properties?: any): any => {
  const schema = {
    type,
    ...properties,
  }
  if (isArray) {
    return newArraySchema(schema)
  }
  return schema
}

export const generateSchemas = (
  operationType: 'create' | 'read' | 'update' | 'delete',
  modelTokens: ModelToken[],
  enumTokens: EnumToken[]
) => {
  const createJSONSchema = (propertyToken: PropertyToken) => {
    if (isString(propertyToken.type)) return newPrimitiveSchema('string', propertyToken.isArray)
    if (isBool(propertyToken.type)) return newPrimitiveSchema('boolean', propertyToken.isArray)
    if (isNumber(propertyToken.type)) return newPrimitiveSchema('number', propertyToken.isArray)
    if (isDate(propertyToken.type)) return newPrimitiveSchema('string', propertyToken.isArray, { format: 'date-time' })
    if (isJson(propertyToken.type)) return newPrimitiveSchema('object', false, { additionalProperties: true })

    const enumToken = enumTokens.find(e => {
      return e.name === propertyToken.type
    })
    if (enumToken) {
      if (propertyToken.isArray) {
        if (propertyToken.default) {
          return newPrimitiveSchema('string', true, { enum: enumToken.values })
        }
      } else {
        return newPrimitiveSchema('string', false, { enum: enumToken.values })
      }
    }
    const modelToken = modelTokens.find(e => {
      return e.name === propertyToken.type && e.type === 'type'
    })

    if (modelToken) {
      const schema = newObjectSchema()

      populateJSONSchema(schema, modelToken)

      if (propertyToken.isArray) {
        return newArraySchema(schema)
      }
      return schema
    }
    propertyToken.isOptional = false
    if (propertyToken.isArray) {
      return newArraySchema({ $ref: `${propertyToken.type}.json#` })
    }
    return { $ref: `${propertyToken.type}.json#` }
  }

  const populateJSONSchema = (schema: any, modelToken: ModelToken) => {
    modelToken.properties.forEach(propertyToken => {
      const operation = propertyToken.operations?.find(operation => operation.name === operationType)
      if (operation) {
        const jsonSchema = createJSONSchema(propertyToken) as any // TODO: change this to interface
        schema.properties[propertyToken.name] = jsonSchema
        if (propertyToken.desc) {
          jsonSchema.description = propertyToken.desc
        }
        if (operationType === 'read' && propertyToken.hasOwnProperty('default')) {
          // if (jsonSchema.type === 'number') {
          //   jsonSchema.default = Number(propertyToken.default)
          // } else if (jsonSchema.type === 'boolean') {
          //   jsonSchema.default = propertyToken.default === 'true'
          // } else if (jsonSchema.type === 'array') {
          //   jsonSchema.default = formatDefaultArrayItems(propertyToken.default, propertyToken.type)
          // } else {
          //   jsonSchema.default = propertyToken.default
          // }
          jsonSchema.default = propertyToken.default
        }
        if (operation.hasOwnProperty('default')) {
          jsonSchema.default = operation.default
        }
        if (propertyToken.isOptional && !operation.hasOwnProperty('default')) {
          jsonSchema.nullable = true
        }
        if (propertyToken.type === 'String') {
          if (propertyToken.hasOwnProperty('min')) {
            jsonSchema.minLength = propertyToken.min
          }
          if (propertyToken.hasOwnProperty('max')) {
            jsonSchema.maxLength = propertyToken.max
          }
        } else if (isNumber(propertyToken.type)) {
          if (propertyToken.hasOwnProperty('min')) {
            jsonSchema.minimum = propertyToken.min
          }
          if (propertyToken.hasOwnProperty('max')) {
            jsonSchema.maximum = propertyToken.max
          }
        }
        if (propertyToken.name === 'id') {
          ensureRequired(schema)
          schema.required.push(propertyToken.name)
        }

        propertyToken.operations?.forEach(operation => {
          if (operation.name === operationType && operation.required) {
            ensureRequired(schema)
            schema.required.push(propertyToken.name)
          }
        })
        // remove duplicates from shema.required
        if (schema.required) {
          schema.required = [...new Set(schema.required)]
        }
      }
    })
  }

  const ensureRequired = (schema: any) => {
    if (!schema.required) {
      schema.required = []
    }
  }

  // loop through tokenized models and create a json schema for each model
  const schemas = modelTokens
    .map(modelToken => {
      if (modelToken.type === 'model' || modelToken.type === 'type') {
        // || operationType === 'read') {
        const schema = newObjectSchema({ $id: '' })
        switch (operationType) {
          case 'create':
            schema.$id = `${modelToken.name}CreateInputSchema`
            break
          case 'read':
            schema.$id = `${modelToken.name}Schema`
            break
          case 'update':
            schema.$id = `${modelToken.name}UpdateInputSchema`
            break
          case 'delete':
            schema.$id = `${modelToken.name}DeleteInputSchema`
            break
        }

        populateJSONSchema(schema, modelToken)
        return schema
      }
    })
    .filter(s => s)
  return JSON.parse(JSON.stringify(schemas.filter(s => Object.keys(s?.properties).length > 0)))
}
