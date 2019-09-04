import React, { Component } from 'react'
import { auth } from '../../lib/auth'
import { Text } from '../lib'

export class Home extends Component {
  state = {
    welcomeMessage: '¡Bienvenido a Hidrogen!'
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => user ? this.setState({ welcomeMessage: `¡Hola de nuevo, ${user.get('username')}!` }) : this.setState({ welcomeMessage: '¡Bienvenido a Hidrogen!' }))
  }

  renderWelcomeMessage = () => {
    /* firebaseAPI.isAuth()
      ? this.setState({ welcomeMessage: `¡Hola de nuevo, ${firebaseAPI.getAuthUser().get('username')}!` })
      : this.setState({ welcomeMessage: '¡Bienvenido a Hidrogen!' }) */

    if (auth.isUserAuthenticated()) {
      return `¡Hola de nuevo, ${auth.getAuthedUser().get('username')}!` 
    } else {
      return '¡Bienvenido a Hidrogen!'
    }
  }

  render = () => {

    // Seems to be a bug which doesn't let the Home component re-render. Therefore,
    // firebaseAPI.isAuth() isn't being called again and we can't update the welcome
    // message for the user.
    // 

    /* let welcomeMessage

    if (firebaseAPI.isAuth()) {
      welcomeMessage = `¡Hola de nuevo, ${firebaseAPI.getAuthUser().get('username')}!`
    } else {
      welcomeMessage = '¡Bienvenido a Hidrogen!'
    } */

    const { welcomeMessage } = this.state

    return (
      <div className='home'>
        <Text className='welcome-message'> { welcomeMessage } </Text>
      </div>
    )
  }
}