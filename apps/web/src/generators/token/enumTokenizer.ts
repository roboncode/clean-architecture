import { isClosingBracket, isComment } from './helpers'

import { Iterator } from './iterator'

const getEnumTokenName = (s: string) => {
  const enumName = s.split('enum ')[1]
  const enumNameWithoutBrackets = enumName.replace(/[{}]/g, '')
  return enumNameWithoutBrackets.trim()
}

export interface EnumToken {
  name: string
  values: string[]
}

class EnumTokenBuilder {
  private name: string
  private values: string[] = []

  constructor(name: string) {
    this.name = name
  }

  public addValue(name: string) {
    this.values.push(name)
  }

  public build(): EnumToken {
    return {
      name: this.name,
      values: this.values,
    }
  }
}

export const parseEnum = (line: string, lines: Iterator<any>) => {
  const enumTokenBuilder = new EnumTokenBuilder(getEnumTokenName(line))
  while (lines.hasNext()) {
    const line = lines.next().value || ''

    if(!line.trim()) {
      continue
    }
    
    if (isComment(line)) {
      continue
    }

    if (isClosingBracket(line)) {
      break
    }

    const value = line.trim().match(/\w+/g)?.shift()
    enumTokenBuilder.addValue(value)
  }
  return enumTokenBuilder.build()
}
