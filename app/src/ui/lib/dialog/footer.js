import React, { Component } from 'react'

import { DialogContextConsumer } from './dialog'

export class Footer extends Component {
  render = () => {
    const { children } = this.props

    return (
      <DialogContextConsumer>
        {dialogContext => (
          <div className='footer'>
            { children }
          </div>
        )}
      </DialogContextConsumer>
    )
  }
}