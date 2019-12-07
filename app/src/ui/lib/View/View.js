import React from 'react'

export const View = props => {
  return (
    <div className={props.className}>
      { props.children }
    </div>
  )
}