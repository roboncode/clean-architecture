export const convertToNumber = (val: string | number) => {
  if (typeof val === 'string') {
    return Number(val)
  }
  return val
}
