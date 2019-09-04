import React, { Component } from 'react'
import classNames from 'classnames'
import { Button, Icon } from '../lib'

export class SignInUpButton extends Component {
  state = {
    disabled: this.props.disabled || false
  }

  componentWillReceiveProps = props => {
    this.setState({ disabled: props.disabled })
  }

  render = () => {
    const { isSubmitting, onClick } = this.props
    const { disabled } = this.state

    const className = classNames(
      { submitting: isSubmitting },
      this.props.className
    )

    return (
      <Button
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        <div className='loader'>
          <span className='loader-item' />
          <span className='loader-item' />
          <span className='loader-item' />
        </div>

        <Icon name='lock' className='icon' />
        <Icon name='navigate_next' className='icon' />
      </Button>
    )
  }
}