import { IEntity } from './IEntity'

export interface INumberTrivia extends IEntity {
  text: string
  number: number
  found: boolean
  type: string
}
