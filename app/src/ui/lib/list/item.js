import React, { Component } from 'react'

import { ListContext } from './list'

import { Text, Icon } from '..'

export class Item extends Component {
  state = {
    label: this.props.label || '',
    icon: this.props.icon || '',
    active: this.props.active || false
  }

  render = () => {
    const { icon, label } = this.state

    return (
      <ListContext.Consumer>
        {
          ({ selectItem }) => (
            <li className='list-item' onClick={selectItem}>
              { icon ? <Icon name={icon} /> : null }
              <Text> { label } </Text>
            </li>
          )
        }
      </ListContext.Consumer>
    )
  }
}