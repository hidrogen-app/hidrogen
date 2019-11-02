import React from 'react'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'
import { Text, Dialog } from '../lib'
import { signIn, signUp } from '../../lib/auth.updated'
import { appState } from '../../lib/app-store'

export class Authentication extends React.Component {
  state = {
    displaySignInForm: true,
    successfulSignIn: null,
    submittingSignIn: false,
    submittingSignUp: false,
    active: true
  }

  componentDidMount = () => {
    appState.onAuthStateChanged(user => {
      if (!user) this.setState({ active: true })
    })
  }

  handleSignIn = ({ credentials, persistence }) => {
    signIn(credentials, persistence)
      .then(() => this.setState({ successfulSignIn: true, submittingSignIn: false, active: false }))
      .catch(() => this.setState({ successfulSignIn: false, submittingSignIn: false }))
  }

  handleSignUp = ({ credentials }) => {
    signUp(credentials)
      .then(() => this.setState({ submittingSignUp: false, active: false }))
      .catch(() => this.setState({ submittingSignUp: false }))
  }

  toggleAuthenticationForm = () => {
    this.setState(state => ({ displaySignInForm: !state.displaySignInForm }))
  }

  renderSignInForm = () => {
    const { successfulSignIn, submittingSignIn } = this.state
    const { handleSignIn, toggleAuthenticationForm } = this
    return <SignInForm
      onSubmit={handleSignIn}
      success={successfulSignIn}
      isSubmitting={submittingSignIn}
      toggleAuthenticationForm={toggleAuthenticationForm} 
    /> 
  }

  renderSignUpForm = () => {
    const { submittingSignUp } = this.state
    const { handleSignUp } = this
    return <SignUpForm
      onSubmit={handleSignUp}
      isSubmitting={submittingSignUp}
      toggleAuthenticationForm={this.toggleAuthenticationForm}
    />
  }

  render = () => {
    const { displaySignInForm, active } = this.state
    return (
      <Dialog className='authentication' opened={active} closeButton={false}>
        <Dialog.Body>
          { displaySignInForm
            ? this.renderSignInForm()
            : this.renderSignUpForm()
          }

          <div className='side-panel'>
            <Text> ¡Bienvenido a Hidrogen! </Text>
          </div>
        </Dialog.Body>
      </Dialog>
    )
  }
}