import React from 'react'
import classnames from 'classnames'
import { Text, TextInput, Button, Switch, Form, Icon } from '../lib'
import { SignInUpButton } from './signinup-button'
import { auth } from '../../lib/auth'

export class SignInForm extends React.Component {
  state = {
    authPersistence: false,
    loginSuccessful: true,
    isSubmitting: false,
    showPassword: true,
    email: '',
    password: ''
  }

  componentWillReceiveProps = props => {
    this.setState({
      isSubmitting: props.isSubmitting,
      loginSuccessful: props.success
    })
  }

  onSubmit = () => {
    this.setState({ isSubmitting: true }, () => {
      const { email, password, authPersistence } = this.state
      const { onSubmit } = this.props
      if (typeof onSubmit === 'function') {
        const credentials = { email, password }
        onSubmit({
          credentials, authPersistence
        })
      }
    }) 
  }

  /* login = () => {
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
  } */

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

  onEnterPressed = event => {
    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }

  render = () => {
    const { showPassword, loginSuccessful, isSubmitting, email, password } = this.state
    const { onSubmit } = this

    const classname = classnames(
      'signin',
      { error: !loginSuccessful }
    )

    return (
      <div className={classname}>

        { !loginSuccessful ? <Text className='error-message'> You shall not pass! Wrong email or password! </Text> : null }

        <div className='form'>
          <TextInput placeholder='Correo electrónico' name='email' onChange={this.handleEmailChange} onKeyDown={this.onEnterPressed} />
          <TextInput placeholder='Contraseña' name='password' className='password' secureTextEntry={showPassword} onChange={this.handlePasswordChange} onKeyDown={this.onEnterPressed} />
        </div>

        <SignInUpButton disabled={!email || !password} isSubmitting={isSubmitting} onClick={onSubmit} className='signin-btn' />

        <div className='links'>
          <Text onClick={this.props.toggleAuthenticationForm}> ¿Eres nuevo en Hidrogen? ¡Regístrate! </Text>
        </div>
      </div>
    )
  }
}