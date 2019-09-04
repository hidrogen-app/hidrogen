import React, { Component } from 'react'
import classNames from 'classnames'

import { Titlebar } from './titlebar'
import { Authentication } from './authentication'
import { Slideshow } from './slideshow'
import { RandomBackground } from './random-background'
import { Loader } from './loader'
import { Changelog } from './changelog'

import { slideshowItems } from '../models/slideshow-items'
import { auth } from '../lib/auth'
import { getCLIArgsFromMainProcess } from '../lib/cli'

export class App extends Component {
  state = {
    authState: false,
    theme: 'dark',
    renderLoader: false,
    showChangelog: false
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      user ? this.setState({ authState: true }) : this.setState({ authState: false })
      this.setState({ showChangelog: true })
    })

    /* let firstTime = true
    let justUpdated = true
    if (!firstTime && authState && justUpdated) {
      this.setState({ showChangelog: true })
    } */

    
  }

  renderChangelog = () => {
    /* const args = getCLIArgsFromMainProcess()
    console.log(args) */
    const { authState, showChangelog } = this.state

    /* if (args.showChangelog && authState) {
      this.setState({ showChangelog: true })
    } else {
      this.setState({ showChangelog: false })
    } */

    return <Changelog show={showChangelog} onClose={() => this.setState({ showChangelog: false })} />
  }

  render = () => {
    const { authState, theme, showChangelog } = this.state

    const className = classNames(
      'app',
      { 
        'dark-theme': theme === 'dark',
        authed: authState
      }
    )

    return (
      <div className={className} theme='dark'>

        <Titlebar />
        <Loader show={false} />
        <Authentication />
        <Slideshow items={slideshowItems} /> 
        <RandomBackground />

      </div>
    )
  }
}