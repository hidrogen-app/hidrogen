import React, { Component } from 'react'
import { Button } from '../../lib'

import { ImportForm } from './import-form'
import { AddForm } from './add-form'

export class AddGame extends Component {
  state = {
    showImportForm: false
  }

  renderAddForm = () => {
    return <AddForm onSubmit={this.props.onAddGame} showImportForm={() => this.setState({ showImportForm: true })} />
  }

  renderImportForm = () => {
    return <ImportForm showAddForm={() => this.setState({ showImportForm: false })} />
  }

  render = () => {
    const { showImportForm } = this.state

    return (
      <div className='add-game'>
        {/* <Accordion>
          <Accordion.Item title='Añadir un juego a la biblioteca' opened item={<AddForm onSubmit={this.props.onAddGame} />} />
          <Accordion.Item title='Importar juegos desde otras bibliotecas' item={<ImportForm />} />
        </Accordion> */}

        <Button icon='close' onClick={this.props.onCancel} className='cancel-btn' />

        { showImportForm ? this.renderImportForm() : this.renderAddForm() }

      </div>
    )
  }
}