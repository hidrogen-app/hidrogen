import React, { Component } from 'react'
import classnames from 'classnames'

export class Slide extends Component {
  render = () => {

    return (
      <div className={classnames('slide', this.props.className)}>
        { this.props.children }
      </div>
    )
  }

}