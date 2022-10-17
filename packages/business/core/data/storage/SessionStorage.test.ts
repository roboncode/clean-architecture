import { describe, expect, it } from 'vitest'

import { SessionStorage } from './SessionStorage'

describe('test session storage', () => {
  const sessionStorage = new SessionStorage()

  it('should return null when there is no value', async () => {
    const value = sessionStorage.getItem('key')
    expect(value).toBe(null)
  })

  it('should return the value when there is one', async () => {
    sessionStorage.setItem('key', 'value')
    const value = sessionStorage.getItem('key')
    expect(value).toBe('value')
  })

  it('should return the length of the storage', async () => {
    sessionStorage.setItem('key', 'value')
    const length = sessionStorage.length
    expect(length).toBe(1)
  })

  it('should return the key at the index', async () => {
    sessionStorage.setItem('key', 'value')
    const key = sessionStorage.key(0)
    expect(key).toBe('key')
  })

  it('should remove the item at the key', async () => {
    sessionStorage.setItem('key', 'value')
    sessionStorage.removeItem('key')
    const value = sessionStorage.getItem('key')
    expect(value).toBe(null)
  })

  it('should clear the storage', async () => {
    sessionStorage.setItem('key', 'value')
    sessionStorage.clear()
    const value = sessionStorage.getItem('key')
    expect(value).toBe(null)
  })

  it('should return null when there is no value', async () => {
    const value = sessionStorage.getItem('key')
    expect(value).toBe(null)
  })
})
