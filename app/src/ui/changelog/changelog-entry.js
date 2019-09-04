import React, { Component } from 'react'
import { Text } from '../lib'

export class ChangelogEntry extends Component {
  formatContent = content => {
    let items = content.map(item => (
      <Text className='item'> { item.message } </Text>
    ))

    return items
  }

  render = () => {
    const { version, content } = this.props

    return <div className='changelog-entry'>
      <Text className='version'> { version } </Text>
      { this.formatContent(content) }
    </div>
  }
}