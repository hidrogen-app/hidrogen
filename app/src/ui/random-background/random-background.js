import React, { Component } from 'react'

import { Image } from '../lib/image'

import LoL from '../../../static/images/backgrounds/league-of-legends.jpg' 
import WoW from '../../../static/images/backgrounds/battle-for-azeroth.jpeg'
import Lol2 from '../../../static/images/backgrounds/lol2.jpg'

// Experimental live backgrounds.
/* import Kaisa from '../../../static/images/backgrounds/kaisa.mp4'
import Neko from '../../../static/images/backgrounds/neko.mp4'
import Pyke from '../../../static/images/backgrounds/pyke.mp4'
import Aatrox from '../../../static/images/backgrounds/aatrox.mp4' */

export class RandomBackground extends Component {
  state = {
    // backgrounds: [ Kaisa, Neko, Pyke, Aatrox ],
    // selectedBackground: Pyke
    backgrounds: [ LoL, Lol2 ],
    selectedBackground: LoL
  }

  componentWillMount = () => {
    this.randomizeBackground()
  }

  randomizeBackground = () => {
    let min = 0
    let max = this.state.backgrounds.length - 1

    let random = Math.floor(Math.random() * (max - min + 1)) + min

    this.setState({
      selectedBackground: this.state.backgrounds[random]
    })
  }

  render = () => {
    const { selectedBackground } = this.state

    return (
      <div className='random-background'>
        <div className='bg-overlay'></div>
        <Image source={selectedBackground} className='background' />
        {
          // <video src={selectedBackground} autoPlay muted loop className='background' />
        }
      </div>
    )
  }
}
