import objectObserver from 'on-change'
import { EventEmitter } from 'events'

export class Observable extends EventEmitter {
  constructor(object) {
    super()
    this.observer = this.setObserver(object)
  }

  getObservedObject = () => {
    return this.observer
  }

  setObserver = object => {
    return objectObserver(object, (path, value, previousValue) => {
      this.emit(`observable-${path}-key-updated`, value)
    })
  }

  observe = (key, callback) => {
    this.on(`observable-${key}-key-updated`, callback)
  }
}