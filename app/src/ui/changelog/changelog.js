import React, { Component } from 'react'
import classNames from 'classnames'
import { Text, Button } from '../lib'
import { changelog } from '../../models/changelog'
import { ChangelogEntry } from './changelog-entry'

export class Changelog extends Component {
  state = {
    entries: [],
    show: this.props.show || false
  }

  componentDidMount = () => {
    const { releases } = changelog
    let entries = []

    for (let version in releases) {
      const entry = {
        version: version,
        content: releases[version]
      }

      entries.push(entry)
    }
    this.setState({ entries })
  }

  componentWillReceiveProps = props => {
    this.setState({ show: props.show })
  }

  close = () => {
    const { onClose } = this.props
    this.setState({ show: false }, () => onClose())
  }

  renderEntries = () => {
    const { entries } = this.state

    let changelogEntries = entries.map(entry => (
      <ChangelogEntry version={entry.version} content={entry.content} />
    ))

    return changelogEntries
  }

  render = () => {
    const { show } = this.state
    const { close } = this

    const className = classNames(
      'changelog',
      { show: show }
    )

    return <div className={className}>
      <div className='header'>
        <Text className='title'> Cambios en la versión </Text>
        <Button icon='close' onClick={close} className='close-btn' />
      </div>

      { this.renderEntries() }
    </div>
  }
}