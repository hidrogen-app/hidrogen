import React, { Component } from 'react'

const { remote } = window.require('electron')
const { dialog } = remote

import { Button } from '..'

export class FileInput extends Component {
  state = {
    fileName: '',
    filePath: '',
    files: [],
    type: this.props.type || 'default'
  }

  showExplorerDialog = () => {
    dialog.showOpenDialog({
      properties: ['openFiles'],
      filters: [{ name: 'Ejecutables' }],
      extensions: ['exe']
    }, files => {
      if (files) {
        this.setState({ files })
        this.props.onChange({ files })
      } else {
        return
      }
    })
  }

  returnImage = event => {
    const files = event.target.files
    if (files) {
      this.setState({ files })
      this.props.onChange({ files })
    } else {
      return
    }
  }

  render = () => {
    const { type } = this.state
    return (
      type !== 'image'
        ? <Button icon={this.props.icon} label={this.props.label ? this.props.label : null} className='file-input' onClick={this.showExplorerDialog} />
        : <input type='file' onChange={this.returnImage} />
        
    )
  }
}