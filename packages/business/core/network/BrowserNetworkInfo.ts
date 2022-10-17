import { INetworkInfo } from './INetworkInfo'

export class BrowserNetworkInfo implements INetworkInfo {
  async isConnected(): Promise<boolean> {
    return globalThis.navigator?.onLine || false
  }
}
