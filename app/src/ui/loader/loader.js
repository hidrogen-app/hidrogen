import React, { Component } from 'react'
import classnames from 'classnames'

export class Loader extends Component {
  state = {
    show: this.props.show || false
  }

  componentWillReceiveProps = props => {
    this.setState({ show: props.show })
  }

  render = () => {
    const classname = classnames(
      'loader',
      { show: this.state.show }
    )

    return (
      <div className={classname}>
        <div className='ball-container'>
          <span className='ball'></span>
          <span className='ball'></span>
          <span className='ball'></span>
          <span className='ball'></span>
          <span className='ball'></span>
          <span className='ball'></span>
        </div>
      </div>
    )
  }
}