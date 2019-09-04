import React from 'react'
import classnames from 'classnames'

export const Text = props => {
  return <span className={classnames('text', props.className)} onClick={props.onClick} > {props.children} </span>
}