export const isEnum = (s = '') => s.startsWith('enum')

export const isModel = (s = '') => s.startsWith('model') || s.startsWith('type')

export const isType = (s = '') => s.startsWith('s')

export const isClosingBracket = (s = '') => s.endsWith('}')

export const isComment = (s = '') => s.trim().startsWith('//')

export const isVirtualProperty = (s = '') => s.startsWith('@property')

export const hasMap = (s = '') => s.includes('@map')

export const hasCreate = (s = '') => s.includes('@create')

export const hasUpdate = (s = '') => s.includes('@update')

export const hasDelete = (s = '') => s.includes('@delete')

export const hasRead = (s = '') => s.includes('@read')

export const hasDefault = (s = '') =>
  s.includes('@default') && !s.trim().startsWith('id ') && !s.trim().includes('DateTime')

export const getDefault = (s = '') => {
  let v = s.split('@default(')[1].split(')')[0].replaceAll('"', '')
  if (v.startsWith('[') && v.endsWith(']')) {
    v = v.replace(/(\w+)/g, '"$1"')
  }
  try {
    return JSON.parse(v)
  } catch (e) {
    return v
  }
}

export const hasVirtualDefault = (operationName: string, s = '') => {
  const regExp = new RegExp(`@(${operationName})!?\\((.*)\\)`, 'g')
  return !!s.match(regExp)
}

export const getVirtualDefault = (operationName: string, s = '') => {
  const regExp = new RegExp(`@(${operationName})!?\\(([^)]*)`)
  const match = s.match(regExp)
  if (match) {
    try {
      return JSON.parse(`{"default": ${match.pop()}}`).default
    } catch(e) {
      console.error(e)
      return '!! ERROR PARSING DEFAULT VALUE !!'
    }
  }
}

export const hasMin = (s = '') => {
  if (s === undefined) {
    debugger
  }
  return s.includes('@min')
}

export const getMin = (s = ''): number => {
  const result = s.match(/@min\(\d+\)/g)
  return parseFloat(result ? result[0].replace(/@min\(|\)/g, '') : '0')
}

export const hasMax = (s = '') => s.includes('@max')

export const getMax = (s = ''): number => {
  const result = s.match(/@max\(\d+\)/g)
  return parseFloat(result ? result[0].replace(/@max\(|\)/g, '') : '0')
}

export const hasNullable = (s = '') => s.includes('@nullable')

export const hasRequired = (s = '') => s.includes('@required')

export const getDesc = (s = '') => {
  if (s.includes('/// ')) {
    return (s.split('/// ').pop() || '').trim()
  }
  return ''
}

export const isRequired = (word: string) => {
  // check if @word has ! at the end
  return word.endsWith('!')
}

export const hasUnique = (s = '') => s.trim().includes('@unique')

export const isUnique = (s = '') => s.trim().startsWith('@@unique')

export const isIndex = (s = '') => s.trim().startsWith('@@index')
