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

const { ipcRenderer } = window.require('electron')


export class Library extends Component {
  state = {
    games: [],
    filtered: [],
    displayAddGame: false,
    updateAvailable: false
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.fetchGames()
      } else {
        this.setState({ games: [] })
      }
    })

    ipcRenderer.on('update-downloaded', () => this.setState({ updateAvailable: true }))
  }

  fetchGames = async () => {
    try {
      const games = await library.fetchAll()
      if (games) {
        this.setState({ games })
      } else {
        this.setState({ games: [] })
      }
    } catch (err) {
      console.log("Error al importar juegos")
    }
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
      const game = await library.add(gameObject)
      this.setState({ game: this.state.games.push(game) })

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
          key={game.get('uid')}
          uid={game.get('uid')}
          title={game.get('title')}
          execPath={game.get('execPath')}
          background={game.get('background')}
          icon={game.get('icon')}
          provider={game.get('provider')}
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

        <GameContainer view={viewType}>

          { this.renderGames() }

        </GameContainer>

      </div>
    )
  }

}