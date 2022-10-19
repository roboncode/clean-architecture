import { IAsyncStorage } from 'business/core/data/storage/IAsyncStorage'
import { rejects } from 'assert'
import sqlite3 from 'sqlite3'

export class SQLiteStorage implements IAsyncStorage {
  private db: sqlite3.Database

  constructor(public filename = ':memory:') {
    this.db = new sqlite3.Database(filename)

    this.db.serialize(() => {
      this.db.run('CREATE TABLE IF NOT EXISTS kv (key TEXT, value TEXT)')
      this.db.run('CREATE UNIQUE INDEX IF NOT EXISTS key_index ON kv (key)')
    })
  }

  length(): Promise<number> {
    return new Promise((resolve, reject) => {
      const select = 'COUNT(*)'
      this.db.get(`SELECT ${select} FROM kv`, (err, row) => {
        if(err) return reject(err)
        resolve(row[select])
      })
    })
  }

  clear(): Promise<void> {
    return new Promise(resolve => this.db.run(`DELETE FROM kv`, resolve))
  }

  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM kv WHERE key = ?`, [key], (err, row) => {
        if(err) return reject(err)
        resolve(row ? row.value : null)
      })
    })
  }

  key(index: number): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM kv LIMIT 1 OFFSET ?`, [index], (err, row) => {
        if(err) return reject(err)
        resolve(row ? row.key : null)
      })
    })
  }

  removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM kv WHERE key = ?`, [key], (err: any) => {
        if(err) return reject(err)
        resolve()
      })
    })
  }

  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // insert or replace
      this.db.run(`INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)`, [key, value], (err: any) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  close(): Promise<void> {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => this.db.close((err: any) => {
      if(err) return reject(err)
      resolve()
    }))
  }
}

export const SQLiteStorageFactory = {
  create: (filename = ':memory:'): SQLiteStorage => new SQLiteStorage(filename),
}
