import React, { Component } from 'react'

import { Item } from './item'

export const ListContext = React.createContext()

export class List extends Component {
  static Item = Item

  state = {
    items: this.props.items || [],
    activeItem: this.props.activeItem
  }

  selectItem = () => {
    console.log('Hi!')
  }

  render = () => {
    const { children } = this.props
    const context = Object.assign(this.state, { selectItem: this.selectItem })

    return (
      <ListContext.Provider value={context}>
        <div className='list'>
           
          { children }

        </div>
      </ListContext.Provider>
    )
  }
}