import React, { Component } from 'react'
import classnames from 'classnames'

import { Text, TextInput, Button, Switch, Form, Icon } from '../lib'

import { auth } from '../../lib/auth'
import { SignInUpButton } from './signinup-button'

export class SignIn extends Component {
  state = {
    authPersistence: false,
    loginSuccessful: true,
    isSubmitting: false,
    showPassword: true,
    email: '',
    password: ''
  }

  login = () => {
    this.setState({ isSubmitting: true }, () => {
      const { email, password, authPersistence } = this.state
      const credentials = { email, password }

      auth.signIn(credentials, authPersistence)
        .then(user => {
          this.setState({ isSubmitting: false, loginSuccessful: true })
          // context.setUserAuthState(true)

          const username = user.get('username')
          const email = user.get('email')
          const userObject = { username, email }
          // formattedConsoleLog('Authentication', 'success', `Successfully logged in as`, userObject)
        })
        .catch(err => {
          this.setState({ isSubmitting: false, loginSuccessful: false })
          console.log(err)

          // formattedConsoleLog('Authentication', 'error', `Something went wrong: ${err}}`)
        })
    })
  }

  handleEmailChange = ({ value }) => {
    this.setState({ email: value })
  }

  handlePasswordChange = ({ value }) => {
    this.setState({ password: value })
  }

  toggleKeepLoggedIn = event => {
    this.setState({ authPersistence: event.switchState.active })
  }

  togglePassword = event => {
    this.setState({ showPassword: !event.switchState.active })
  }

  sendForgottenPasswordEmail = () => {

  }

  render = () => {
    const { showPassword, loginSuccessful, isSubmitting, email, password } = this.state

    const classname = classnames(
      'signin',
      { error: !loginSuccessful }
    )

    return (
      <div className={classname}>

        { !loginSuccessful ? <Text className='error-message'> You shall not pass! Wrong email or password! </Text> : null }

        <div className='form'>
          <TextInput placeholder='Correo electrónico' name='email' onChange={this.handleEmailChange} />
          <TextInput placeholder='Contraseña' name='password' className='password' secureTextEntry={showPassword} onChange={this.handlePasswordChange} />
          { /* <Button icon='google' label='Iniciar sesión con Google' className='google-sign-in-btn' onClick={auth.signInWithGoogle}/> */ }
        </div>

        {/* <Button
          icon={!email || !password ? 'lock' : 'navigate_next'}
          className='signin-btn'
          isSubmitting={isSubmitting}
          disabled={!email || !password}
          onClick={this.login}
        /> */}

        <SignInUpButton disabled={!email || !password} isSubmitting={isSubmitting} onClick={this.login} className='signin-btn' />

        <div className='links'>
          

          
          {
            // <Switch label='Mantenerme conectado' onStateChange={this.toggleKeepLoggedIn} className='stay-signedin-switch' />
            // <Text> Iniciar sesión con <Icon name='google' /> </Text>
            // <Text className='anonymous-signin-btn'> Iniciar sesión de manera anónima. </Text>
            // <Text onClick={this.sendForgottenPasswordEmail} className='forgotten-password'> He olvidado la contraseña. </Text>
          }
          
          <Text onClick={this.props.toggleForm}> ¿Eres nuevo en Hidrogen? ¡Regístrate! </Text>
        </div>
        

        

        {/* <Switch label='Show password' onStateChange={this.togglePassword} /> */}
        

        {
          /* <Button
            label='Iniciar sesión'
            behaviour='submit'
            isSubmitting={isSubmitting}
            disabled={!email || !password}
            onClick={this.login}
          /> */
        }

        

        
        
      </div>
    )
  }
}