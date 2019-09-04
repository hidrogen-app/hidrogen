import React, { Component } from 'react'
import classnames from 'classnames'

import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export class Authentication extends Component {
  state = {
    shouldDisplayLoginForm: true
  }

  toggleForm = () => {
    this.setState(state => ({ shouldDisplayLoginForm: !state.shouldDisplayLoginForm }))
  }

  render = () => {
    const { shouldDisplayLoginForm } = this.state

    return (
      <div className='authentication'>
        {
          shouldDisplayLoginForm 
            ? <SignIn toggleForm={this.toggleForm} /> 
            : <SignUp toggleForm={this.toggleForm} />
        }
      </div>
    )
  }
}