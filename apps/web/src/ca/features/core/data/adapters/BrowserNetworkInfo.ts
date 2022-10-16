import { INetworkInfo } from "../platform/INetworkInfo"

export class BrowserNetworkInfo implements INetworkInfo {
  async isConnected(): Promise<boolean> {
    return navigator.onLine;
  }
}