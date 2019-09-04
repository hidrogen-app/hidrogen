import React, { Component } from 'react'

import { Item } from './item'

export class Accordion extends Component {
  static Item = Item

  render = () => {
    const { children } = this.props

    return (
      <div className='accordion'>
        { children }
      </div>
    )
  }
}