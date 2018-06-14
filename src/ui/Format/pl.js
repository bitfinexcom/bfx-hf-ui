import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './pl.css'

export default class FormatPL extends React.PureComponent {
  static propTypes = {
    v: PropTypes.number.isRequired,
  }

  static defaultProps = {
    v: 0,
  }

  render () {
    const { v, className, children, ...props } = this.props

    return (
      <span
        className={ClassNames(v < 0 ? 'format-pl__loss' : 'format-pl__gain', className)}
        {...props}
      >{children || v}</span>
    )
  }
}
