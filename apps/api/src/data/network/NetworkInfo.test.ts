import { describe, expect, it } from 'vitest'

import { ServerNetworkInfo } from './NetworkInfo'

describe('ServerNetworkInfo', () => {
  it('should return true', async () => {
    const networkInfo = new ServerNetworkInfo()
    const connected = await networkInfo.isConnected()
    expect(connected).toBe(true)
  })
})
