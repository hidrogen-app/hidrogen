import React, { Component } from 'react'
import className from 'classnames'

import { NavLink } from './nav-link'

export class Navigation extends Component {
  render = () => {
    return (
      <div className={className('navigation', this.props.className)}>
        {
          this.props.items.map((item, index) => (
            <NavLink 
              key={index}
              label={item.label}
              selected={this.props.activeItem === item}
              onClick={() => this.props.selectItem(item)}
            />
          ))
        }
      </div>
    )
  }
}