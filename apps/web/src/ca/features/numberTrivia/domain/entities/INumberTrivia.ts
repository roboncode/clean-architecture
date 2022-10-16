import { IEntity } from '../../../core/entities/IEntity'

export interface INumberTrivia extends IEntity {
  text: string
  number: number
  found: boolean
  type: string
}
