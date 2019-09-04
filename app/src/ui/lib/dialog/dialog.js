import React, { Component } from 'react'
import classNames from 'classnames'

import { Header } from './header'
import { Body } from './body'
import { Footer } from './footer'

const DialogContext = React.createContext()
export const DialogContextConsumer = ({ children }) => {
 return (
   <DialogContext.Consumer>
     {dialogContext => {
       if (!dialogContext) {
         throw new Error('You can\'t place a child out of the parent component.')
       }

       return children(dialogContext)
     }}
   </DialogContext.Consumer>
 )
}

export class Dialog extends Component {
  static Header = Header
  static Body = Body
  static Footer = Footer

  state = {
    opened: this.props.opened || false,
    onSubmit: this.props.onSubmit
  }

  componentWillReceiveProps = props => {
    this.setState({
      opened: props.opened
    })
  }

  close = () => {
    this.setState({ opened: false })

    const { onClose } = this.props
    if (onClose && typeof onClose === 'function') {
      onClose()
    }
  }

  onDialogClick = () => {
    // We wanna close the dialog when the user clicks on the black
    // background (main div).

    this.close()
  }

  onDialogContentClick = event => {
    // We don't want to close the dialog when the user clicks on it.

    event.preventDefault()
    event.stopPropagation()
  } 

  render = () => {
    const { children, onClose} = this.props
    const { opened } = this.state
    const dialogContext = Object.assign(this.state, { 
      close: this.close,
      onClose: onClose
    })

    const className = classNames(
      'dialog',
      { opened: opened },
      this.props.className
    )

    return (
      <DialogContext.Provider value={dialogContext}>
        <div className={className} onClick={this.onDialogClick}>
          <div className='content' onClick={this.onDialogContentClick}>

            {/* <div className='header'>
              This is a modal
            </div>

            <div className='body'>
              This is a modal
            </div>

            <div className='footer'>

            </div> */}

            { children }

          </div>
        </div>
      </DialogContext.Provider>
    )
  }
}
