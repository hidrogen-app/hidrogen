import React, { Component } from 'react'
import classnames from 'classnames'

import { Button, TextInput, Dialog } from '../lib'

export class Toolbar extends Component {
  state = {
    showSearchBar: false,
    updateAvailable: this.props.updateAvailable || false
  }

  constructor (props) {
    super(props)
    this.searchBar = React.createRef()
  }

  componentWillReceiveProps = props => {
    this.setState({ updateAvailable: props.updateAvailable })
  }

  toggleSearchBar = () => {
    this.setState(state => this.setState({ showSearchBar: !state.showSearchBar }))
  }

  renderUpdateAvailableButton = () => {
    const { onQuitAndInstallUpdate } = this.props

    return <Button
      icon='get_app'
      tooltip='¡Actualización disponible!'
      className='update-available-btn'
      onClick={onQuitAndInstallUpdate}
    />
  }

  render = () => {
    const { showSearchBar, updateAvailable } = this.state
    const { search, addButton } = this.props

    showSearchBar ? this.searchBar.current.focus() : null

    return (
      <div className='toolbar'>

        <div className='buttons'>
          <Button icon='add' className='add-btn' onClick={addButton} />
          <Button icon='view_list' value='list-view' />
          <Button icon='inbox' value='a-z-order' />
        </div>
        
        {
          // <Button icon='dashboard' value='dashboard-view' tooltip='Mostrar en cuadrícula' className='active' />
          // <Button icon='view_list' value='list-view' tooltip='Mostrar en lista' disabled />
          // <Button icon='search' className={classnames('search-icon', { active: showSearchBar })} onClick={this.toggleSearchBar} />
        }
      
        <div className='searchbar-box'>
          <Button icon='search' className={classnames('search-icon', { active: showSearchBar })} onClick={this.toggleSearchBar} />
          <TextInput name='search-bar' className={classnames('search-bar', showSearchBar)} onChange={search} ref={this.searchBar} />
        </div>
        

        { updateAvailable ? this.renderUpdateAvailableButton() : null }

      </div>
    )
  }
}