import React, { Component } from 'react'
import classNames from 'classnames'
import { Text, Icon } from '..'

export class Item extends Component {
  state = {
    opened: this.props.opened || false,
    title: this.props.title || 'Accordion item',
    item: this.props.item,
    disabled: this.props.disabled || false
  }

  componentWillReceiveProps = props => {
    this.setState({ opened: props.opened })
  }

  toggle = () => {
    this.setState(state => ({ opened: !state.opened }))
  }

  render = () => {
    const { title, item, opened, disabled } = this.state

    const className = classNames(
      'accordion-item',
      { 
        opened: opened,
        disabled: disabled
      }
    )

    return (
      <div className={className}>

        <div className='accordion-header' onClick={this.toggle}>
          <Text> { title } </Text>
          <Icon className='icon' name='expand_more' />
        </div>

        <div className='accordion-body'>
          { item }
        </div>

      </div>
    )
  }
}