import React, { Component } from 'react'

import { DialogContextConsumer } from './dialog'

export class Body extends Component {
  render = () => {
    const { children } = this.props

    return (
      <DialogContextConsumer>
        {dialogContext => (
          <div className='body'>
            { children }
          </div>
        )}
      </DialogContextConsumer>
    )
  }
}