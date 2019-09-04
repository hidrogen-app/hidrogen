import React, { Component } from 'react'

import { Text } from '../lib'

import { SettingsNav } from './nav'

import { SettingsNavItems } from '../../models/settings-nav'

export class Settings extends Component {
  render = () => {
    return (
      <div className='settings'>
        <Text> ¡Vaya! Parece que nuestros minions han estado vagueando. <br /> Los ajustes estarán disponibles en una futura actualización. </Text>
      </div>
    )
  }
}