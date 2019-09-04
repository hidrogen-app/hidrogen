import React, { Component } from 'react'
import classnames from 'classnames'

import { Text } from '../text'
import { Icon } from '../icon'

export class Button extends Component {
  state = {
    label: this.props.label,
    icon: this.props.icon,
    type: this.props.type || 'primary',
    isSubmitting: this.props.isSubmitting || false,
    disabled: this.props.disabled || false,
    tooltip: this.props.tooltip || ''
  }

  componentWillReceiveProps = props => {
    this.setState({
      isSubmitting: props.isSubmitting,
      disabled: props.disabled
    })
  }

  renderLoader = () => {
    return (
      <div className='loader'>
        <span className='loader-item' />
        <span className='loader-item' />
        <span className='loader-item' />
      </div>
    )
  }

  render = () => {
    const { label, icon, type, disabled, isSubmitting, tooltip } = this.state

    const className = classnames(
      'btn',
      {
        primary: this.state.type === 'primary',
        secondary: this.state.type === 'secondary',
        danger: this.state.type === 'danger',
        warning: this.state.type === 'warning',
        success: this.state.type === 'success',
        info: this.state.type === 'info',
        disabled: disabled
      },
      this.props.className
    )

    return (
      <div className={className} onClick={this.props.onClick} >
        { this.state.icon && !isSubmitting ? <Icon className='icon' name={this.state.icon} /> : null}
        { this.state.label && !isSubmitting ? <Text className='label'> {this.state.label} </Text> : null }
        { tooltip && !isSubmitting ? <span className='tooltip'> { tooltip } </span> : null }
        { isSubmitting ? this.renderLoader() : null }
        { this.props.children }
      </div>
    )
  }
}
