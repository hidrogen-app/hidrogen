import { Observable } from './observable'

const InitialAppState = {
  games: [],
  currentAuthUser: null,
  currentBoardView: 'home',
  isDialogActive: true
}

class AppStore {
  constructor(state) {
    this.stateObserver = new Observable(state)
    this.state = this.stateObserver.getObserver()
  }

  getState() {
    return this.state
  }

  /* setState = state => {
    Object.getOwnPropertyNames(state).forEach(key => {
      this.state[key] = state[key]
    })

    this.emit('did-state-update', this.state)
  } */

  dispatch(action) {
    const { key, value } = action
    return this.state = Object.assign({}, { [key]: value }, this.state)
  }

  observe(key, callback) {
    this.stateObserver.observe(key, callback)
  }
}

export const appState = new AppStore(InitialAppState)