import React from 'react'
import className from 'classnames'

// import { NavLink } from './nav-link'
import { View } from '../lib'
import { appState } from '../../lib/app-store'


/* export class Navigation extends React.Component {
  state = {
    currentBoardView: this.props.currentBoardView || 'home'
  }

  renderNavItems = () => {
    const 
  }

  render = () => {
    return (
      <View className='navigation'>
        { this.renderNavItems() }

        <NavItem label='Inicio' selected={'home' === currentBoardItem} onClick={() => appState.setState({ currentBoardView: 'home' })} /> 
        <NavItem label='Biblioteca' selected={'library' === currentBoardItem} onClick={() => appState.setState({ currentBoardView: 'library' })} />
        <NavItem label='Perfil' selected={'profile' === currentBoardItem} onClick={() => appState.setState({ currentBoardView: 'profile' })} />
        <NavItem label='Ajustes' selected={'settings' === currentBoardItem} onClick={() => appState.setState({ currentBoardView: 'settings' })} />
      </View>
    )
  }
} */

const NavItem = props => {
  return <span 
    className={className('nav-link', { selected: props.selected })}
    onClick={props.onClick}
  > {props.label} </span>
}

export const Navigation = props => {
  return (
    <View className='navigation'>
      { props.boardViews.map(view => (
        <NavItem 
          key={view.id} 
          label={view.label} 
          selected={props.currentBoardView === view} 
          onClick={() => appState.setState({ currentBoardView: view.id })} 
        />
      )) }
    </View>
  )
}



/* 
export class Navigation extends React.Component {
  renderNavItems = () => {
    const { boardItems } = this.props
    boardItems.map(item => (
      <div className={className('nav-link')}></div>
    ))
  }

  render = () => {
    return (
      <View className='navigation'>
        <NavItem label='Inicio' route={routes.home} />
      </View>
    )
  }

  render = () => {
    return (
      <div className={className('navigation', this.props.className)}>
        {
          this.props.items.map((item, index) => (
            <NavLink
              key={index}
              label={item.label}
              selected={this.props.activeItem === item}
              onClick={() => this.props.selectItem(item)}
            />
          ))
        }
      </div>
    )
  }
} */