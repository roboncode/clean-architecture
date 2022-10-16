import { IDeserializable } from '../../../core/entities/IDeserializable'
import { INumberTrivia } from '../../domain/entities/INumberTrivia'
import { ISerializable } from '../../../core/entities/ISerializable'
import { IValidate } from '../../../core/entities/IValidate'

export class NumberTrivia implements INumberTrivia, IValidate, ISerializable, IDeserializable {
  constructor(public number: number, public text: string, public found: boolean, public type = 'trivia') {}

  serialize(): string {
    return JSON.stringify(this)
  }

  deserialize(input: any): this {
    // check if input is a string
    if (typeof input === 'string') {
      input = JSON.parse(input as string)
    }

    Object.assign(this, input)
    return this
  }

  validate(): boolean {
    return this.text.length > 0 && this.number > 0
  }
}
