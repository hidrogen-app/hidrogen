import React, { Component } from 'react'
import { Form, TextInput, FileInput, Image, Text, Icon, Button } from '../../lib'

export class AddForm extends Component {
  state = {
    title: '',
    execPath: ''
  }

  setExecPath = ({ files }) => {
    this.setState({ execPath: files[0] })
  }

  submit = () => {
    const { onSubmit } = this.props
    if (typeof onSubmit === 'function') {
      onSubmit(this.state)
    }
  }
 
  render = () => {
    return (
      <Form className='add-form'>
        <TextInput placeholder='Título del juego' name='game-title' align='left' value={this.state.title} onChange={({ value }) => this.setState({ title: value })} />
        <TextInput placeholder='Ruta de instalación' name='game-path' className='game-path-input' align='left' value={this.state.execPath} onChange={({ value }) => this.setState({ execPath: value })} />

        <FileInput icon='folder_open' label='Seleccionar ruta de instalación' onChange={this.setExecPath} className='path-input' />

        <Button label='Importar juegos desde otras bibliotecas' className='import-btn' onClick={this.props.showImportForm} />

        <div className='image-input'>
          <div className='text-wp'>
            <Icon name='file_upload' className='icon' />
            <Text> Subir una imagen </Text>
          </div>
        </div>

        <Button label='Añadir' className='submit-btn' onClick={this.submit} />
      </Form>
    )
  }
}