import { describe, expect, it } from 'vitest'

import { SQLiteStorageFactory } from './SQLiteStorage'

describe('test session storage', async () => {
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const storage = SQLiteStorageFactory.create()

  await delay(1000)
  
  it('should return null when there is no value', async () => {
    await storage.clear()
    const value = await storage.getItem('key')
    expect(value).toBe(null)
  })

  it('should return the value when there is one', async () => {
    await storage.clear()
    storage.setItem('key', 'value')
    const value = await storage.getItem('key')
    expect(value).toBe('value')
  })

  it('should return the length of the storage', async () => {
    await storage.clear()
    await storage.setItem('key', 'value')
    const length = await storage.length()
    expect(length).toBe(1)
  })

  it('should return the key at the index', async () => {
    await storage.clear()
    await storage.setItem('myKey', 'myValue')
    const key = await storage.key(0)
    expect(key).toBe('myKey')
  })

  it('should remove the item at the key', async () => {
    await storage.clear()
    await storage.setItem('key', 'value')
    await storage.removeItem('key')
    const value = await storage.getItem('key')
    expect(value).toBe(null)
  })

  it('should clear the storage', async () => {
    await storage.setItem('key', 'value')
    await storage.clear()
    const value = await storage.getItem('key')
    expect(value).toBe(null)
  })

  // it('should close the storage', async () => {
  //   try {
  //     await storage.close()
  //     expect(true).toBe(true)
  //   } catch (error) {
  //     expect(error).toBe(null)
  //   }
  // }
})
