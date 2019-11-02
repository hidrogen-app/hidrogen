import React, { Component } from 'react'
import { Text } from '../lib'
import { appState } from '../../lib/app-store'

export class Home extends Component {
  state = {
    welcomeMessage: '¡Bienvenido a Hidrogen!'
  }

  componentDidMount = () => {
    appState.onAuthStateChanged(user => {
      user
        ? this.renderCustomWelcomeMessage(user.username)
        : this.renderDefaultWelcomeMessage()
    })
  }

  renderCustomWelcomeMessage = username => {
    this.setState({ welcomeMessage: `¡Hola de nuevo, ${username}!` })
  }

  renderDefaultWelcomeMessage = () => {
    this.setState({ welcomeMessage: '¡Bienvenido a Hidrogen!' })
  }

  render = () => {
    const { welcomeMessage } = this.state

    return (
      <div className='home'>
        <Text className='welcome-message'> { welcomeMessage } </Text>
      </div>
    )
  }
}