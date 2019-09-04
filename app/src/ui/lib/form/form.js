import React, { Component } from 'react'
import classnames from 'classnames'

export class Form extends Component {
  render = () => {
    const { children } = this.props

    return (
      <form className={this.props.className}>
        { this.props.children }
      </form>
    )
  }
}