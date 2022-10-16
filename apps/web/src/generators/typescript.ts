import { ModelToken, PropertyToken } from './token/modelTokenizer'

import { EnumToken } from './token/enumTokenizer'

const getType = (propertyToken: PropertyToken, modelTokens: ModelToken[], enumTokens: EnumToken[]) => {
  switch (propertyToken.type) {
    case 'String':
      return 'string'
    case 'Boolean':
      return 'boolean'
    case 'Int':
    case 'BigInt':
    case 'Float':
      return 'number'
    case 'DateTime':
      return 'string'
    case 'Json':
      return 'any'
    default:
      return propertyToken.type + (propertyToken.isArray ? '[]' : '')
  }
}

export const generateTypeScript = (
  operationType: 'create' | 'read' | 'update' | 'delete',
  modelTokens: ModelToken[],
  enumTokens: EnumToken[]
) => {
  const enumTypings =
    enumTokens.map(enumToken => {
      return `export type ` + enumToken.name + ` = "` + enumToken.values.join('" | "') + `";\n`
    }) || []

  // loop through tokenized models and create a json schema for each model
  const modelTypings = modelTokens
    .map(modelToken => {
      if (modelToken.type === 'model' || modelToken.type === 'type') {
        let ts = `export interface `
        switch (operationType) {
          case 'create':
            ts += `${modelToken.name}CreateInput`
            break
          case 'read':
            ts += `${modelToken.name}`
            break
          case 'update':
            ts += `${modelToken.name}UpdateInput`
            break
          case 'delete':
            ts += `${modelToken.name}DeleteInput`
            break
        }

        ts += ' { \n'

        modelToken.properties.forEach(propertyToken => {
          if (propertyToken.operations?.find(operation => operation.name === operationType)) {
            // if there is a description, add it to the typescript definition
            if (propertyToken.desc) {
              ts += `  /** ${propertyToken.desc} */\n`
            }
            ts += `  ${propertyToken.name}`
            // check if required
            if (propertyToken.operations?.find(operation => operation.name === operationType && operation.required)) {
              ts += ': '
            } else {
              ts += '?: '
            }
            ts += getType(propertyToken, modelTokens, enumTokens) + ';\n'
          }
        })
        return (ts += `}\n`)
      }
      return ''
    })
    .filter(s => s)
  return enumTypings.join('\n') + '\n' + modelTypings.join('\n')
}
