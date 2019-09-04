import { Model } from './model'

const userSchema = {
  uid: null,
  username: '',
  email: '',
  pictureUrl: '',
  games: [],
  settings: [],
  metadata: {
    createdOn: null,
    lastSignInTime: null
  }
}

export class User extends Model {
  constructor (schema) {
    super(schema)
  }
}