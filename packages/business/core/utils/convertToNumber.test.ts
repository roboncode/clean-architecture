import { describe, expect, it } from 'vitest'

import { convertToNumber } from './convertToNumber'

describe('convertToNumber', () => {
  it('should convert a string to a number', () => {
    expect(convertToNumber('1')).toBe(1)
  })

  it('should return a number', () => {
    expect(convertToNumber(1)).toBe(1)
  })
})
