import React, { Component } from 'react'
import classNames from 'classnames'
import { Button } from '../lib'

const { shell } = window.require('electron')

export class Game extends Component {
  state = {
    uid: this.props.uid,
    title: this.props.title || 'Cool game',
    execPath: this.props.execPath,
    imageUrl: this.props.imageUrl,
    showMenu: false
  }

  toggleMenu = () => {
    this.setState(state => ({ showMenu: !state.showMenu }))
  }

  play = () => {
    const { execPath } = this.state
    shell.openItem(execPath)
  }

  remove = () => {
    const { onRemove } = this.props

    onRemove(this.state.uid)
  }

  render = () => {
    const { title, imageUrl, showMenu } = this.state
    const { remove } = this

    const className = classNames(
      'game',
      {
        'show-menu': showMenu,
        'hide-image': !imageUrl
      }
    )

    return (
      <div className={className}>

        <span className='title'> { title } </span>

        <div className='card' onMouseLeave={() => this.setState({ showMenu: false })}>
          
          <Button label='Jugar' className='play-btn' onClick={this.play} />

          <Button className='menu-toggle-btn' onClick={this.toggleMenu}>
            <span className='circle' />
            <span className='circle' />
            <span className='circle' />
          </Button>

          <div className='menu'>
            <Button icon='close' className='close-btn' onClick={this.toggleMenu} />

            <div className='btn-group'>
              {
                // <Button icon='mode_edit' tooltip='Editar' />
              }
              <Button icon='delete' tooltip='Eliminar' onClick={remove}/>     
            </div>
          </div>

          <div className='bg-hover-overlay' />
          <img src={imageUrl} className='background' />

        </div>
      </div>
    )
  }
}