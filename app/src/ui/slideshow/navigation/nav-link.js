import React, { Component } from 'react'
import classnames from 'classnames'

export class NavLink extends Component {
  render = () => {
    const className = classnames(
      'nav-link',
      { active: this.props.selected }
    )
    return (
      <span className={className} onClick={this.props.onClick}> {this.props.label} </span>
    )
  }
}