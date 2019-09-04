import React from 'react'
import classnames from 'classnames'

export const Icon = props => {
  const className = classnames(`icon-${props.name}`, props.className)
  return <i className={className} />
}