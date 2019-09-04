import React, { Component } from 'react'

import { Text, Icon, List } from '../lib'

export class SettingsNav extends Component {
  state = {
    items: this.props.items || [],
    activeItem: this.props.activeItem
  }

  renderItems = () => {
    const { items } = this.state

    items.map(item => (
      <List.Item
        key={item.id}
        icon={item.icon}
        label={item.label}
      />
    ))
  }

  render = () => {
    return (
      <List singleSelect onSelect={this.selectItem} className='settings-nav'>
        <List.Item icon='settings' label='General' />
        <List.Item icon='dashboard' label='Biblioteca' />
        <List.Item icon='mode_edit' label='Apariencia' />
      </List>
    )
  }
}