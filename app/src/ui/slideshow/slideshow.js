import React, { Component } from 'react'
import classNames from 'classnames'
import { Navigation } from './navigation'
import { Slide } from './slide'

import { appState } from '../../lib/app-store'

export class Slideshow extends Component {
  state = {
    items: this.props.items || [],
    activeItem: this.props.activeItem || this.props.items[0],
    renderNav: true,
    hidden: true
  }

  componentDidMount = () => {
    appState.onAuthStateChanged(user => {
      if (user) {
        this.setState(state => ({ activeItem: state.items[0], renderNav: true }))
        this.state.items[2].label = user.username
      } else {
        // this.setState(state => ({ activeItem: state.items[3], renderNav: false }))
      }
    })

    appState.onDialogStateChanged(isDialogActive => {
      const shouldHideSlideshow = isDialogActive
      this.setState({ hidden: shouldHideSlideshow })
    })
  }

  componentWillReceiveProps = props => {
    this.setState({
      items: props.items
    })
  }

  selectItem = item => {
    this.setState({
      activeItem: item
    })
  }

  assignPosition = (item) => {
    if (this.state.items.indexOf(item) > this.state.items.indexOf(this.state.activeItem)){
      return 'hidden-right'
    }
    
    if (this.state.items.indexOf(item) < this.state.items.indexOf(this.state.activeItem)){
      return 'hidden-left'
    }
  }

  render = () => {
    const { activeItem, renderNav, items, hidden } = this.state

    /* if (auth.getAuthedUser()) {
      items[3].label = auth.getAuthedUser().get('username')

      if (items[items.length - 1].id === 'authentication') {
        items.pop()
      }

      

      if (items.length === 5) {
        const editedItems = items.slice(0, 4)
        this.setState({ 
          items: editedItems,
          activeItem: editedItems[0]
        })
      }

      
    } else {
      // Briefly check we're editing the original array to avoid deleting other items.
      if (items.length === 5) {
        const authItem = items[items.length - 1]
        const editedItems = items.slice(0, 3)
        editedItems.push(authItem)
        this.setState({ 
          items: editedItems,
          activeItem: editedItems[0]
        })
        
      }
    } */

    

    /* if (firebaseAPI.isAuth()) {
      console.log('Items: ', items)
      items[3].label = firebaseAPI.getAuthUser().get('username')
      console.log('Updated items: ', items)
      console.log('New items: ', items.slice(0, -1))

      const authItems = items.slice(0, -1)

      /* this.setState({ 
        items: authItems,
        activeItem: items[0]
      }) */

      // this.setState(state => ({ items: state.items.slice(0, -1) }))
    /* } else {
      const authItem = items.pop()
      items.pop()
      items.push(authItem)
      console.log(items)
      
    } */

    const className = classNames(
      'slideshow',
      { hidden: hidden }
    )

    return (
      <div className={className}>
        <Navigation 
          items={this.state.items} 
          activeItem={activeItem} 
          selectItem={this.selectItem}
          className={renderNav ? '' : 'hidden'}
        />

        {
          items.map((item, index) => (
            <Slide
              key={index}
              className={activeItem === item ? 'active' : this.assignPosition(item)}
            >
              {item.component}
            </Slide>          
          ))
        }
      </div>
    )
  }
}