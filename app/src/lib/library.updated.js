import generateUID from 'uuid/v4'
import { firebase } from './firebase'
import { getCurrentUser } from './auth'
import { objectToArray as ota } from './util'
import { LibraryStore } from './stores/library-store'
import { Game } from '../models/game'
import { log } from './log'

const libraryStore = new LibraryStore()

export const fetchGames = async () => {
  try {
    log.info('[Library] Fetching games from user...')

    const fetchedGames = getCurrentUser().games
    const games = ota(fetchedGames)
    await libraryStore.set('games', games)

    log.info('[Library] Games were fetched successfully.')
    return Promise.resolve(games)
  } catch (err) {
    log.error(`[Library] Something went wrong during game fetching process... ${err}`)
    return Promise.reject(err)
  }
}