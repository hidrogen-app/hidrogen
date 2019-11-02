import generateUID from 'uuid/v4'
/* import { firebase } from './firebase'
import { getCurrentUser } from './auth'
import { objectToArray as ota } from './util'
import { LibraryStore } from './stores/library-store' */


import { appState } from './app-store'

export const parseUserGameObject = gameObject => {
  let gameArray = []
  for (let game in gameObject) {
    gameArray.push(game)
  }
  return gameArray
}

export const fetchGames = async () => {
  try {
    const games = parseUserGameObject(appState.getState().user.games)
    appState.setState({ games })
    return Promise.resolve(games)
  } catch (err) {
    console.error('Error')
    return Promise.reject(err)
  }
}