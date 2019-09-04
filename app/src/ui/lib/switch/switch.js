import React, { Component } from 'react'
import classnames from 'classnames'

import { Text } from '../text'

export class Switch extends Component {
  state = {
    active: this.props.active || false,
    disabled: this.props.disabled || false,
    label: this.props.label || ''
  }

  toggle = event => {
    this.setState({ active: !this.state.active }, () => {
      const toggleEvent = Object.assign(event, { switchState: this.state })

      const { onStateChange } = this.props

      if (typeof onStateChange === 'function') {
        onStateChange(toggleEvent)
      }
    })
  }

  render = () => {
    const { label, disabled, active } = this.state

    const className = classnames(
      'switch',
      { active: active },
      { disabled: disabled },
      this.props.className
    )

    return (
      <div className={className} onClick={this.toggle}>
        { label ? <Text className='label'> {label} </Text> : null }

        <div className='container'>
          <span className='inner-circle'></span>
        </div>
      </div>
    )
  }
}
