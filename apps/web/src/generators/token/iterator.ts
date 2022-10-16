interface IteratorItem<T> {
  value: any
}

export class Iterator<T> {
  private list: IteratorItem<T>[]
  private index: number = -1

  constructor(arr: T[]) {
    this.list = arr.map(item => ({ value: item }))
  }

  getIndex(): number {
    return this.index
  }

  next(): IteratorItem<T> {
    this.index++
    return this.list[this.index]
  }

  prev(): IteratorItem<T> {
    this.index--
    return this.list[this.index]
  }

  peek(steps = 1): IteratorItem<T> | undefined {
    if (this.hasPeek(steps)) {
      return this.list[this.index + steps]
    }
  }

  hasNext(): boolean {
    return this.index + 1 < this.list.length
  }

  hasPrev(): boolean {
    return this.index - 1 >= 0
  }

  hasPeek(steps = 1): boolean {
    return this.index + steps >= 0 && this.index + steps < this.list.length
  }
}
