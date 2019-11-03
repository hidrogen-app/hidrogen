import React, { Component } from 'react'
import classNames from 'classnames'
import { auth } from '../../lib/auth'
import { library } from '../../lib/library'
import { Text, Dialog } from '../lib'

import { Toolbar } from './toolbar'
import { GameContainer } from './game-container'
// import { AddGameDialog } from './add-game-dialog'
import { AddGame } from './add-game'
import { Game } from './game'

import { authState } from '../../lib/auth.updated'

import { appState } from '../../lib/app-store'
import { fetchGames, addGameToLibrary } from '../../lib/library.updated'

const { ipcRenderer } = window.require('electron')


export class Library extends Component {
  state = {
    games: [],
    filtered: [],
    displayAddGame: false,
    updateAvailable: false
  }

  componentDidMount = () => {
    appState.onAuthStateChanged(user => {
      user
        ? this.setState({ games: [] }, () => this.fetchGames())
        : this.setState({ games: [] })
    })

    ipcRenderer.on('update-downloaded', () => this.setState({ updateAvailable: true }))
  }

  fetchGames = async () => {
    console.log(`%c[lib] Started fetching games from appState...`, 'background: #222; color: #bada55')
    // const { games } = appState.getState()
    

    try {
      const games = await fetchGames()
      console.log(`%c[lib] Got the following games from appState:\n${JSON.stringify(games)}`, 'background: #222; color: #bada55')
      if (games) {
        this.setState({ games })
      } else {
        this.setState({ games: [] })
      }
    } catch (err) {
      console.log("Error al importar juegos")
      console.log(err)
    }
    /* try {
      const games = await library.fetchAll()
      if (games) {
        this.setState({ games })
      } else {
        this.setState({ games: [] })
      }
    } catch (err) {
      console.log("Error al importar juegos")
      console.log(err)
    } */
  }

  search = ({ value }) => {
    let filteredGames = []

    if (value !== '') {
      filteredGames = this.state.games.filter(game => {
        const lc = game.title.toLowerCase()
        const filter = value.toLowerCase()

        return lc.includes(filter)
      })
    } else {
      filteredGames = this.state.games
    }

    this.setState({ filtered: filteredGames })
  }

  add = async gameObject => {
    try {
      const game = await addGameToLibrary(gameObject)
      this.setState({ game: this.state.games.push(game), displayAddGame: false })

      /* this.setState(state => ({ 
        games: state.games.push(game)
      }, () => console.log(games))) */

    } catch (err) {
      console.log(err)
    }

      /* .then(game => this.setState({ games: this.state.games.push(game) }))
      .catch(err => console.log(err)) */
  }

  toggleAddGameDialog = () => {
    this.setState({ showAddGameDialog: true })
  }

  onRemoveGame = async guid => {
    try {
      const games = await library.remove(guid)
      this.setState({ games })
    } catch (err) {
      console.log(err)
    }
  }
  
  renderGames = () => {
    const { games } = this.state
    const { onRemoveGame } = this

    if (games.length) {
      let renderedGames = games.map(game => (
        <Game 
          key={game.uid}
          uid={game.uid}
          title={game.title}
          execPath={game.execPath}
          background={game.backgroundImageUrl}
          icon={game.icon}
          provider={game.provider}
          onRemove={onRemoveGame}
        />
      ))

      return renderedGames
    } else {
      return null
    }
  }

  renderToolbar = () => {
    const { updateAvailable } = this.state

    return <Toolbar
      search={this.search}
      addButton={() => this.setState(state => ({ displayAddGame: !state.displayAddGame }))}
      updateAvailable={updateAvailable}
      onQuitAndInstallUpdate={() => {
        this.setState({ updateAvailable: false })
        ipcRenderer.send('quit-and-install-update')
      }}
    />
  }

  render = () => {
    const { viewType, showAddGameDialog, games, displayAddGame } = this.state

    const className = classNames(
      'library',
      {
        'display-add-game': displayAddGame
      }
    )

    return (
      <div className={className}>
        { this.renderToolbar() }

  
        {games.length ? null : <Text className='empty-library-message'> Esto está muy vacío...<br/> ¡Añade un juego a tu biblioteca! </Text> }

        <AddGame onAddGame={this.add} onCancel={() => this.setState({ displayAddGame: false })} />

        {/* <Dialog opened={true}>
          <Dialog.Body>
            Soy un dialogo mmm...
          </Dialog.Body>
        </Dialog> */}

        <GameContainer view={viewType}>

          { this.renderGames() }

        </GameContainer>

      </div>
    )
  }

}