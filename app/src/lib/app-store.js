import { Emitter } from 'event-kit'
import objectObserver from 'on-change'

const DefaultAppState = {
  games: [],
  user: null,
  isDialogActive: true
}

class StateObserver {
  constructor (state) {
    this.observer = this.setObserver(state)
    this.emitter = new Emitter()
  }

  getObservedState = () => {
    return this.observer
  }

  setObserver = state => {
    return objectObserver(state, (path, value, previousValue) => {
      this.emitter.emit('state-updated', {
        path,
        value,
        previousValue
      })

      // console.log(`${path} key was changed! Emitting state-${path}-updated.`)
      this.emitter.emit(`state-${path}-updated`, value)
    })
  }

  observe = (key, callback) => {
    // console.log(`Observing now the ${key} prop...`)
    this.emitter.on(`state-${key}-updated`, callback)
  }
}

class AppStore {
  constructor (state) {
    this.stateObserver = new StateObserver(state)
    this.state = this.stateObserver.getObservedState()
    this.emitter = new Emitter()
  }

  getState = () => {
    return this.state
  }

  setState = state => {
    Object.getOwnPropertyNames(state).forEach(key => {
      this.state[key] = state[key]
    })

    this.emitter.emit('did-state-update', this.state)
  }

  onStateUpdated = callback => {
    this.emitter.on('did-state-update', callback)
  }

  observeState = (key, callback) => {
    this.state.observe(key, callback)
  }

  onAuthStateChanged = callback => {
    this.stateObserver.observe('user', callback)
  }

  onDialogStateChanged = callback => {
    console.log('Dialog observer set')
    this.stateObserver.observe('isDialogActive', callback)
  }

  cleanState = () => {
    this.state = null
  }
}

export const appState = new AppStore(DefaultAppState)