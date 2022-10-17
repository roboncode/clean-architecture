import { describe, expect, it } from 'vitest'

import { BrowserNetworkInfo } from './BrowserNetworkInfo'

describe('BrowserNetworkInfo', () => {
  it('should return true if the browser is online', async () => {
    // @ts-ignore
    globalThis.navigator = {
      onLine: true,
    }

    const networkInfo = new BrowserNetworkInfo()
    const online = await networkInfo.isConnected()
    expect(online).toBe(true)
  })

  it('should return false if the browser is offline', async () => {
    // @ts-ignore
    globalThis.navigator = {
      onLine: false,
    }

    const networkInfo = new BrowserNetworkInfo()
    const online = await networkInfo.isConnected()
    expect(online).toBe(false)
  })
})
