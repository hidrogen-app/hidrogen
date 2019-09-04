import uuidv4 from 'uuid/v4'
import { EventEmitter } from 'events'
import { firebase } from './firebase'
import { auth } from './auth'
import { Game } from '../models/game'

class Library extends EventEmitter {
  constructor () {
    super()
    this.games = []
  }

  fetchAll = async () => {
    let games = this.games
    let fetchedGames

    try {
      if (auth.getAuthedUser()) {
        fetchedGames = auth.getAuthedUser().get('games')
      } else {
        // fetchedGames = await localDB.get('games')
      }

      if (fetchedGames) {
        for (let game in fetchedGames) {
          games.push(new Game(fetchedGames[game]))
        }
      }

      this.games = games

      return Promise.resolve(games)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  fetchFromProvider = provider => {
    
  }
  
  add = async game => {
    try {
      const uuid = auth.getAuthedUser().get('uid')
      const guid = uuidv4().split('-').join('')

      console.log(auth.getAuthedUser())
      console.log(uuid)
        
      const gameData = {
        uid: guid,
        title: game.title,
        execPath: game.execPath,
        provider: 'hidrogen',
        metadata: {
          addedOn: new Date().toString().split(' (')[0]
        }
      }

      await firebase.database().ref(`users/${uuid}/games/${guid}`).set(gameData)

      const gameInstance = new Game(gameData)
      return Promise.resolve(gameInstance)
    
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

  remove = async guid => {
    const uuid = auth.getAuthedUser().get('uid')
    let games = this.games
    
    let gameIndex
    games.map(game => {
      if (game.get('uid') === guid) {
        gameIndex = games.indexOf(game)
      }
    })
    
    games.splice(gameIndex, 1)
    
    try {
      await firebase.database().ref(`users/${uuid}/games/${guid}`).remove()
      return Promise.resolve(games)
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }

  }
}

export const library = new Library()