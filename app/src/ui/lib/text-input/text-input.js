import React, { Component } from 'react'
import classnames from 'classnames'

export class TextInput extends Component {
  state = {
    value: this.props.value || '',
    name: this.props.name,
    isEmpty: true,
    placeholder: this.props.placeholder || '',
    disabled: this.props.disabled || false,
    readOnly: this.props.readOnly || false,
    autoFocus: this.props.autoFocus || false,
    secureTextEntry: this.props.secureTextEntry || false,
    validationRules: this.props.validationRules || {},
    expandAnimation: this.props.expandAnimation || 'center', // Other values: left, right, none,
    align: this.props.align || 'center',
    active: this.props.active || false
  }

  constructor (props) {
    super(props)
    this.input = React.createRef()
  }

  componentWillReceiveProps = props => {
    this.setState({ 
      value: props.value,
      secureTextEntry: props.secureTextEntry
    }, () => {
      if (props.value) {
        this.setState({ isEmpty: false })
      }
    })
  }

  focus = () => {
    this.input.current.focus()
  }

  onDidFocus = () => {
    this.setState({ active: true })
  }

  onDidBlur = event => {
    if (event.target.value !== '') {
      this.setState({ isEmpty: false, active: false })
    } else {
      this.setState({ isEmpty: true, active: false })
    }
  }

  handleInputChange = event => {
    this.setState({ value: event.target.value }, () => {
      const changeEvent = Object.assign(event, { value: this.state.value })

      const { onChange } = this.props
      if (typeof onChange === 'function') {
        onChange(changeEvent)
      }
    })
  }

  isEmpty = event => {
    if (event.target.value !== '') {
      this.setState({ isEmpty: false })
    } else {
      this.setState({ isEmpty: true })
    }
  }

  render = () => {
    const { disabled, active, placeholder, secureTextEntry, value, isEmpty, align } = this.state
    const className = classnames(
      'text-input',
      {
        active: active,
        disabled: disabled,
        notEmpty: !isEmpty,
        'align-left': align === 'left'
      },
      this.props.className
    )

    return (
      <div className={className}>

        <input
          id={this.state.name}
          name={this.state.name}
          type={secureTextEntry ? 'password' : 'text'}
          value={value}
          autoFocus={this.state.autoFocus}
          onChange={this.handleInputChange}
          onFocus={this.onDidFocus}
          onBlur={this.onDidBlur}
          className='input'
          ref={this.input}
        />

        {
          placeholder ? <label htmlFor={this.state.name} className='placeholder' onClick={this.focus}> {placeholder} </label> : null
        }

      </div>
    )
  }
}