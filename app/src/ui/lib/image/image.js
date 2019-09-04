import React, { Component } from 'react'
import classnames from 'classnames'

export class Image extends Component {
  state = {
    source: ''
  }

  componentWillReceiveProps = props => {
    this.setState({ source: props.source })
  }

  render = () => {
    const { source } = this.state
    const { className } = this.props

    return (
      <React.Fragment>
        {
          source ? <img src={source} className={classnames('image', className)} /> : null
        }
      </React.Fragment>
    )
  }
}