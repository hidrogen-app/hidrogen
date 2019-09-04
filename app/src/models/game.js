import { Model } from './model'

const gameSchema = {
  uid: null,
  title: '',
  execPath: '',
  imageUrl: '',
  provider: '',
  view: ''
}

export class Game extends Model {
  constructor (schema) {
    super(schema)
  }
}