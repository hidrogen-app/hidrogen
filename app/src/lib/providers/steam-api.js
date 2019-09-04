import axios from 'axios'
import { EventEmitter } from 'events'

// const steamID = 76561198260586141

export const steam = new SteamAPI()

class SteamAPI extends EventEmitter {
  constructor () {
    super()
  }

  fetchAll = async steamID => {
    const res = await axios.post(`http://localhost:8083/library/steam`, {
      steamID: steamID
    })

    const { games } = res.data.response
    console.log('Fetched games from Steam:', games)

    return Promise.resolve(games)
  }
}