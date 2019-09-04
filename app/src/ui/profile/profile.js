import React, { Component } from 'react'
import classNames from 'classnames'
import { Button, Text, Image, Form, TextInput } from '../lib'

import { auth } from '../../lib/auth'

export class Profile extends Component {
  state = {
    username: '',
    email: '',
    picture: '',
    editedUsername: '',
    editedEmail: '',
    editMode: false,
    detailsMode: false,
    changePassword: false
  }

  componentDidMount = () => {
    if (auth.getAuthedUser()) {
      this.set(auth.getAuthedUser())
    } else {
      auth.onAuthStateChanged(user => user ? this.set(user) : null)
    }
  }

  set = user => {
    this.setState({
      username: user.get('username'),
      email: user.get('email'),
      picture: user.get('pictureUrl')
    })
  }

  updateUser = async () => {
    const { editedUsername, editedEmail } = this.state

    const editedUser = {
      editedUsername,
      editedEmail
    }
    
    try {
      await auth.updateUser(editedUser)
    } catch (err) {
      console.log(err)
    }
  }

  render = () => {
    const { username, email, picture, editMode, changePassword } = this.state

    const className = classNames(
      'profile',
      {
        'edit-mode': editMode
      }
    )

    return (
      <div className={className}>

        <Form className='edit-form'>
          <div className='image-input'>
            <div className='overlay'>
              <Text> Editar </Text>
            </div>
          </div>

          <div className='fields'>
            <TextInput placeholder='Nombre de usuario' value={username} name='username' className='align-left' onChange={({ value }) => this.setState({ editedUsername: value })} />
            <TextInput placeholder='Correo electrónico' value={email} name='email' className='align-left' onChange={({ value }) => this.setState({ editedEmail: value })} />
            <TextInput placeholder='Contraseña actual' secureTextEntry name='currentPassword' className='align-left' />

            {
              changePassword
                ? <TextInput placeholder='Nueva contraseña' secureTextEntry name='newPassword' className='align-left' />
                : <Button size='small' label='Cambiar mi contraseña' onClick={() => this.setState({ changePassword: true })} />
            }
          </div>

          <div className='buttons'>
            <Button variant='danger' label='Eliminar mi cuenta' className='delete-btn' />
            {
              // <Button variant='secondary' label='Cancelar' className='cancel-btn' onClick={() => this.setState({ editMode: false })} />
            }
            <Button variant='success' label='Guardar cambios' className='accept-btn' onClick={this.updateUser} />
          </div>

          <Button icon='close' onClick={() => this.setState({ editMode: false, changePassword: false })} className='cancel-btn' />
        </Form>

        <div className='summary'>
          {
            // <Image source={picture} className='picture' />
            // <div className='picture' />
          }
          <div source={picture} className='picture' />

          <div className='side-info'>
            <Text className='username'>
              <Text className='nick'> {username} </Text>
              {
                // <Text className='tag'> #2081 </Text>
              }
            </Text>
            <Text className='email'> { email } </Text>
          </div>

          <div className='buttons'>
            
            {
              // <Button label='Editar' className='edit-btn' onClick={() => this.setState({ editMode: true })} />
              // <Button label='Detalles de la cuenta' className='details-btn' onClick={() => this.setState({ detailsMode: true })} />
            }
            <Button label='Cerrar sesión' className='sign-out-btn' onClick={auth.signOut} />
          </div>
        </div>

      </div>
    )
  }
}