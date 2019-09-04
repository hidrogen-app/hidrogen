import { EventEmitter } from 'events'

export class Model extends EventEmitter {
  constructor (data) {
    super()
    this.data = data
  }

  get = key => {
    return this.data[key]
  }

  getAll = () => {
    return this.data
  }

  set = (key, value) => {
    this.data[key] = value
    this.emit('did-update', this.data)
  }

  onDidUpdate = callback => {
    this.on('did-update', callback)
  }
}