import React, { Component } from 'react'

import { NativeWindowController } from '../../lib/native-window-controller'

import { Button } from '../lib'

export class Titlebar extends Component {
  state = {
    windowController: new NativeWindowController()
  }

  render = () => {
    return (
      <div className='titlebar'>
        <div className='window-controls'>

          <Button className="close-btn" onClick={this.state.windowController.close} >
            <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path></svg>
          </Button>

          <Button className="toggle-btn" onClick={this.state.windowController.toggle} >
            <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path></svg>
          </Button>

          <Button className="minimize-btn" onClick={this.state.windowController.minimize} >
            <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,5 10,5 10,6 0,6 Z"></path></svg>
          </Button>

        </div>
      </div>
    )
  }
}