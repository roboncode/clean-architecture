import { IAsyncStorage } from "./IAsyncStorage"

export class SessionStorage implements IAsyncStorage {
  private data: Record<string, string> = {}

  async length() {
    return Object.keys(this.data).length
  }

  async clear() {
    this.data = {}
  }

  async getItem(key: string) {
    return this.data[key] || null
  }

  async key(index: number) {
    return Object.keys(this.data)[index] || null
  }

  async removeItem(key: string) {
    delete this.data[key]
  }

  async setItem(key: string, value: string) {
    this.data[key] = value
  }
}
