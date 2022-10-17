import { describe, expect, it } from 'vitest'

import { NumberTrivia } from './NumberTrivia'

const numberTrivia = new NumberTrivia(1, 'test', true)

describe('create a valid NumberTrivia', () => {
  it('should have a value of 1', () => {
    expect(numberTrivia.number).toBe(1)
  })

  it('should be valid', () => {
    expect(numberTrivia.validate()).toBe(true)
  })
})

describe('create an invalid NumberTrivia', () => {
  const invalidNumberTrivia = new NumberTrivia(0, '', false)

  it('should be invalid', () => {
    expect(invalidNumberTrivia.validate()).toBe(false)
  })
})

describe('serialize NumberTrivia', () => {
  const serialized = numberTrivia.serialize()

  it('should be a string', () => {
    expect(typeof serialized).toBe('string')
  })
})

describe('deserialize a NumberTrivia', () => {
  const serialized = numberTrivia.serialize()
  const deserialized = new NumberTrivia(0, '', false).deserialize(serialized)
  console.log('serialized', serialized)

  it('should have a value of 1', () => {
    expect(deserialized.number).toBe(1)
  })

  it('should be valid', () => {
    expect(deserialized.validate()).toBe(true)
  })
})
