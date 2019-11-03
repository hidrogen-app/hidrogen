import generateUID from 'uuid/v4'
import { firebase } from './firebase'
/*
import { getCurrentUser } from './auth'
import { objectToArray as ota } from './util'
import { LibraryStore } from './stores/library-store' */


import { appState } from './app-store'

export const parseUserGameObject = gameObject => {
  let gameArray = []
  for (let game in gameObject) {
    gameArray.push(gameObject[game])
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

export const addGameToLibrary = async gameData => {
  const uuid = appState.getState().user.uid
  const guid = generateUID().split('-').join('')
  const date = new Date()
  try {
    const game = {
      uid: guid,
      title: gameData.title,
      execPath: gameData.execPath,
      addDate: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    }
    if (game.imagePath) {
      await firebase.storage().ref(`users/${uuid}/games/${guid}.jpg`).put(game.imagePath)
    }
    
    await firebase.database().ref(`users/${uuid}/games/${guid}`).set(gameData)
    return Promise.resolve(game)
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}