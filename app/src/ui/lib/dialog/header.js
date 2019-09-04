import React, { Component } from 'react'

import { DialogContextConsumer } from './dialog'

import { Text, Button } from '..'

export class Header extends Component {
  state = {
    title: this.props.title || '',
    hiddenCloseBtn: this.props.hiddenCloseBtn || false
  }

  render = () => {
    const { title, hiddenCloseBtn } = this.state

    return (
      <DialogContextConsumer>
        {({ onClose, close }) => (
          <div className='header'>

            <Text className='title'> { title } </Text>

            { !hiddenCloseBtn ? <Button icon='close' className='close-btn' onClick={close} /> : null }

          </div>
        )}
      </DialogContextConsumer>
    )
  }
}