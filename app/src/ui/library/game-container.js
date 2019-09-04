import React, { Component } from 'react'

export class GameContainer extends Component {
  state = {
    viewType: this.props.viewType || 'gallery'
  }

  componentWillReceiveProps = props => {
    this.setState({ viewType: props.viewType })
  }

  render = () => {
    const { children } = this.props

    return (
      <div className='game-container'>
        { children }
      </div>
    )
  }
}