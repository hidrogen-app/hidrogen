import React, { Component } from 'react'
import classNames from 'classnames'

import { Titlebar } from './titlebar'
import { Authentication } from './authentication'
import { Slideshow } from './slideshow'
import { RandomBackground } from './random-background'
import { Loader } from './loader'
import { Changelog } from './changelog'

import { getRunningOS } from '../lib/running-os'

import { slideshowItems } from '../models/slideshow-items'
// import { auth } from '../lib/auth'
import { getCLIArgsFromMainProcess } from '../lib/cli'
import { appState } from '../lib/app-store'

// import { authState } from '../lib/auth.updated'

export class App extends Component {
  state = {
    authState: false,
    theme: 'dark',
    renderLoader: false,
    showChangelog: false
  }

  componentDidMount = () => {
    /* appState.onAuthStateChanged(user => {
      user
        ? this.setState({ authState: true })
        : this.setState({ authState: false })
    }) */

    /* authState.onStateUpdated(state => {
      state.user
        ? this.setState({ authState: true })
        : this.setState({ authState: false })
    })


    auth.onAuthStateChanged(user => {
      user ? this.setState({ authState: true }) : this.setState({ authState: false })
      this.setState({ showChangelog: true })
    }) */

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

  renderDialogs = () => {

  }

  renderTitlebar = () => {
    const os = getRunningOS()
    return <Titlebar os={os} />
  }

  renderSlideshow = () => {
    /* appState.onAuthStateChanged(user => {
      user
        ? slideshowItems[3].label = user.username
        : null
    }) */
    return <Slideshow items={slideshowItems} />
  }

  renderBackground = () => {
    return <RandomBackground />
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

        <Loader show={false} />

        <Authentication />

        { this.renderTitlebar() }
        { this.renderSlideshow() }
        { this.renderBackground() }
        
      </div>
    )
  }
}