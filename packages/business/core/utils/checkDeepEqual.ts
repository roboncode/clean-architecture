export const checkDeepEqual = (source: any, target: any) => {
  const sourceKeys = Object.keys(source)
  const targetKeys = Object.keys(target)
  if (sourceKeys.length !== targetKeys.length) {
    return false
  }
  for (const key of sourceKeys) {
    const val1 = source[key]
    const val2 = target[key]
    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && !checkDeepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }
  return true
}

const isObject = (object: any) => {
  return object !== null && typeof object === 'object'
}
