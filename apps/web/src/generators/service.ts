import { ModelOperationToken, ModelToken } from './token/modelTokenizer'

const getTypeScriptType = (type: string) => {
  switch (type) {
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
      return type
  }
}

const lowerCaseFirstLetter = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// take array string and uppercase first letter in each word and join them with an And
const joinWithAnd = (arr: string[]) => {
  return arr.map(word => upperCaseFirstLetter(word)).join('And')
}

const getPropertyType = (token: ModelToken, propertyName: string) => {
  const result = token.properties.find(property => property.name === propertyName)
  if (result) {
    return getTypeScriptType(result.type)
  }
  return 'unknown'
}

export const generateFindMethods = (token: ModelToken, operation: ModelOperationToken) => {
  let ts = ''
  // create a list of key/value pairs of operations properties and their types
  const args = operation.properties.map(property => [property, getPropertyType(token, property)].join(': ')).join(', ')

  let where = ''
  if (operation.properties.length > 1) {
    where = `{ ${operation.properties.join('_')}: { ${operation.properties.join(', ')} } }`
  } else {
    where = `{ ${operation.properties.join('')} }`
  }

  ts += `
// find ${lowerCaseFirstLetter(token.name)} by ${operation.properties.join(' and ')}
export const find${upperCaseFirstLetter(token.name)}${operation.type === 'index' ? 'List' : ''}By${joinWithAnd(
    operation.properties
  )} = async (${args}) => {
  return await prismaClient.${lowerCaseFirstLetter(token.name)}.find${operation.type === 'index' ? 'Many' : 'Unique'}({ where: ${where} })
}`
return ts
}

export const generateCreateMethods = (token: ModelToken, operation: ModelOperationToken) => {
  let ts = ''
  // create a list of key/value pairs of operations properties and their types
  const args = operation.properties.map(property => [property, getPropertyType(token, property)].join(': ')).join(', ')

  let where = ''
  if (operation.properties.length > 1) {
    where = `{ ${operation.properties.join('_')}: { ${operation.properties.join(', ')} } }`
  } else {
    where = `{ ${operation.properties.join('')} }`
  }

  ts += `
// create ${lowerCaseFirstLetter(token.name)} by ${operation.properties.join(' and ')}
export const create${upperCaseFirstLetter(token.name)}By${joinWithAnd(
    operation.properties
  )} = async (${args}) => {
   return await prismaClient.${lowerCaseFirstLetter(token.name)}.create${
    operation.type === 'index' ? 'Many' : ''
  }({ where: ${where} })
}`
return ts
}

export const generateUpdateMethods = (token: ModelToken, operation: ModelOperationToken) => {
  let ts = ''
  // create a list of key/value pairs of operations properties and their types
  const args = operation.properties.map(property => [property, getPropertyType(token, property)].join(': ')).join(', ')

  let where = ''
  if (operation.properties.length > 1) {
    where = `{ ${operation.properties.join('_')}: { ${operation.properties.join(', ')} } }`
  } else {
    where = `{ ${operation.properties.join('')} }`
  }

  ts += `
// update ${lowerCaseFirstLetter(token.name)} by ${operation.properties.join(' and ')}
export const update${upperCaseFirstLetter(token.name)}By${joinWithAnd(
    operation.properties
  )} = async (${args}, data: ${upperCaseFirstLetter(token.name)}UpdateInput ) => {
  return await prismaClient.${lowerCaseFirstLetter(token.name)}.update${
    operation.type === 'index' ? 'Many' : ''
  }({ where: ${where}, data })
}`
return ts
}

export const generateDeleteMethods = (token: ModelToken, operation: ModelOperationToken) => {
  let ts = ''
  // create a list of key/value pairs of operations properties and their types
  const args = operation.properties.map(property => [property, getPropertyType(token, property)].join(': ')).join(', ')

  let where = ''
  if (operation.properties.length > 1) {
    where = `{ ${operation.properties.join('_')}: { ${operation.properties.join(', ')} } }`
  } else {
    where = `{ ${operation.properties.join('')} }`
  }

  ts += `
// delete ${lowerCaseFirstLetter(token.name)} by ${operation.properties.join(' and ')}
export const delete${upperCaseFirstLetter(token.name)}By${joinWithAnd(
    operation.properties
  )} = async (${args}) => {
  return await prismaClient.${lowerCaseFirstLetter(token.name)}.delete${
    operation.type === 'index' ? 'Many' : ''
  }({ where: ${where} })
}`
return ts
}

export const generateService = (
  modelTokens: ModelToken[],
) => {
  const service = modelTokens.map(token => {
    if(token.type !== 'model') return ''
    let ts = `
/** 
 * ${token.name} 
 */

// create ${lowerCaseFirstLetter(token.name)}
export const create${upperCaseFirstLetter(token.name)} = async (data: ${upperCaseFirstLetter(token.name)}CreateInput) => {
  return await prismaClient.${lowerCaseFirstLetter(token.name)}.create({ data })
}`
    const operations: ModelOperationToken[] = [
      {
        name: 'read',
        type: 'unique',
        properties: ['id'],
      },
      {
        name: 'update',
        type: 'unique',
        properties: ['id'],
      },
      {
        name: 'delete',
        type: 'unique',
        properties: ['id'],
      },
    ]
    // add token operations to the operations array
    if (token.operations) {
      operations.push(...token.operations)
    }
    operations.map(operation => {
      console.log('operation', operation.name)
      switch (operation.name) {
        case 'create':
          ts += generateCreateMethods(token, operation)
          break
        case 'read':
          ts += generateFindMethods(token, operation)
          break
        case 'update':
          ts += generateUpdateMethods(token, operation)
          break
        case 'delete':
          ts += generateDeleteMethods(token, operation)
          break
      }
    })

    return ts
  })
  return service.filter(s => s).join('\n').trim()
}
