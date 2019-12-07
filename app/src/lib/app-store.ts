import { EventEmitter } from 'events'
import { Observable } from './observable'

interface Game {
  title: string
  execPath: string
}

interface User {
  name: string
  email: string
}

export interface IAppState {
  readonly games: Array<Game>
  readonly currentAuthenticatedUser: User | null

  // currentBoardView: BoardView
  readonly isDialogActive: boolean
  readonly showWelcomeFlow: boolean
}

const InitialAppState = {
  games: [],
  currentAuthenticatedUser: null,
  isDialogActive: false,
  showWelcomeFlow: false
}

export interface StoreAction {
  readonly key: string
  readonly value: any
}

import objectObserver from 'on-change'

class Observable extends EventEmitter {
  private observer
  public constructor(state: object) {
    super()
    this.observer = this.setObserver(state)
  }

  public getObserver() {
    return this.observer
  }

  private setObserver(state: object) {
    return objectObserver(state, (path, value) => {
      this.emit(`state-${path}-key-updated`, value)
    })
  }

  public observe(key: string, callback: Function) {
    this.on(`observable-${key}-key-updated`, callback)
  }
}

class AppStore {
  private state: IAppState
  private stateObserver: Observable

  public constructor(state: IAppState) {
    this.stateObserver = new Observable(state)
    this.state = this.stateObserver.getObserver()
  }

  public getState = () => {
    return this.state
  }

  /**
   * You should never try to update the state directly, as it's an inmmutable
   * object. Instead, use store.dispatch(action) supplying the corresponding 
   * StoreAction.
   */
  public dispatch(action: StoreAction) {
    const { key, value } = action
    return this.state = Object.assign({}, { [key]: value }, this.state)
  }

  /**
   * Usage: store.observe('currentAuthUser', () => {
   *  console.log('The current authenticated user was updated!')
   * })
   */
  public observe(key: string, callback: Function) {
    this.stateObserver.observe(key, callback)
  }
}

export const appStore: AppStore = new AppStore(InitialAppState)