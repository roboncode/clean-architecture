import { describe, expect, it } from 'vitest'

import { checkDeepEqual } from './checkDeepEqual'

describe('checkDeepEqual', () => {
  it('keys do not have same length', () => {
    expect(checkDeepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false)
  })

  it('should return true when objects are equal', () => {
    const source = { a: 1, b: 2 }
    const target = { a: 1, b: 2 }
    expect(checkDeepEqual(source, target)).toBe(true)
  })

  it('should return false when objects are not equal', () => {
    const source = { a: 1, b: 2 }
    const target = { a: 1, b: 3 }
    expect(checkDeepEqual(source, target)).toBe(false)
  })

  it('should return true when objects are equal with nested objects', () => {
    const source = { a: 1, b: 2, c: { d: 3, e: 4 } }
    const target = { a: 1, b: 2, c: { d: 3, e: 4 } }
    expect(checkDeepEqual(source, target)).toBe(true)
  })

  it('should return false when objects are not equal with nested objects', () => {
    const source = { a: 1, b: 2, c: { d: 3, e: 4 } }
    const target = { a: 1, b: 2, c: { d: 3, e: 5 } }
    expect(checkDeepEqual(source, target)).toBe(false)
  })
})
