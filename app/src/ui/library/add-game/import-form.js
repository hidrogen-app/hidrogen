import React, { Component } from 'react'
import { Form, Button, TextInput, FileInput, Text } from '../../lib'

export class ImportForm extends Component {
  render = () => {
    return (
      <Form className='import-form'>
        
        <div className='provider-selector'>
          <Button icon='steam2' className='provider-btn' />
          <Text> 
            For now, integration with third-party libraries is only available with Steam. In a, we hope near, future, we'll integrate as many libraries as we can, such as Twitch, Battle.net,
            Origin, UPlay, etc.
            Wanna learn more? See the #steam-integration Discord channel in our server!
          </Text>
        </div>

        <TextInput placeholder='SteamID' name='steamID' />
        <TextInput placeholder='Dirección del servidor' name='server' />

        <Button label='Añadir un juego manualmente' className='add-game-btn' onClick={this.props.showAddForm} />

        <Button className='submit-btn' label='Importar' onClick={this.props.onSubmit} />

      </Form>
    )
  }
}