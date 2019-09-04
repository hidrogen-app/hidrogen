import React, { Component } from 'react'
import classnames from 'classnames'
import { auth } from '../../lib/auth'
import { SignInUpButton } from './signinup-button'
import { Text, TextInput, Button, Switch, Form } from '../lib'

export class SignUp extends Component {
  state = {
    hiddenPassword: true,
    error: false,
    isSubmitting: false,
    username: '',
    email: '',
    password: '',
  }

  signUp = () => {
    this.setState({ isSubmitting: true }, () => {
      const { username, email, password } = this.state
      const credentials = { username, email, password }

      auth.signUp(credentials)
        .then(() => {
          this.setState({ isSubmitting: false, error: false })
          // context.setUserAuthState(true)s
        })
        .catch(err => this.setState({ isSubmitting: false, error: true }))
    })
  }

  handleUsernameChange = ({ value }) => {
    this.setState({ username: value })
  }

  handleEmailChange = ({ value }) => {
    this.setState({ email: value })
  }

  handlePasswordChange = ({ value }) => {
    this.setState({ password: value })
  }

  togglePassword = event => {
    this.setState({ hiddenPassword: !event.switchState.active })
  }

  render = () => {
    const { username, email, password, isSubmitting } = this.state

    return (
      <div className='signup'>
        
        <div className='form'>
          <TextInput placeholder='Nombre de usuario' name='username' onChange={this.handleUsernameChange} />
          <TextInput placeholder='Correo electrónico' name='email' onChange={this.handleEmailChange} />
          <TextInput placeholder='Contraseña' name='password' secureTextEntry={this.state.hiddenPassword} onChange={this.handlePasswordChange} />
        </div>

        <SignInUpButton disabled={!username || !email || !password} isSubmitting={isSubmitting} onClick={this.signUp} className='signup-btn' />

        <div className='links'>
          <Switch label='Mostrar contraseña' onStateChange={this.togglePassword} className='toggle-password-btn' />
          <Text onClick={this.props.toggleForm}> Ya tengo una cuenta. </Text>
        </div>

      </div>
    )
  }
}