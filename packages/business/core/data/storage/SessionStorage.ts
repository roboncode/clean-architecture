import { IAsyncStorage } from "./IAsyncStorage"

export class SessionStorage implements IAsyncStorage {
  private data: Record<string, string> = {}

  constructor(public storage?: Storage) {}

  async length() {
    return this.storage?.length || Object.keys(this.data).length
  }

  async clear() {
    if(this.storage) this.storage.clear()
    else this.data = {}
  }

  async getItem(key: string) {
    return this.storage?.getItem(key) || this.data[key] || null
  }

  async key(index: number) {
    return this.storage?.key(index) || Object.keys(this.data)[index] || null
  }

  async removeItem(key: string) {
    if(this.storage) this.storage.removeItem(key)
    else delete this.data[key]
  }

  async setItem(key: string, value: string) {
    if(this.storage) this.storage.setItem(key, value)
    else this.data[key] = value
  }
}
