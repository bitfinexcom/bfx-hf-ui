import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './Button.props'
import './style.css'

export default class Button extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onClick, label, red, green, blue, gray, className, dataProduct, disabled,
    } = this.props

    return (
      <button
        type='button'
        onClick={disabled ? () => {} : onClick}
        data-product={dataProduct}
        className={ClassNames('hfui-button', className, {
          red,
          blue,
          gray,
          green,
          disabled,
        })}
      >
        {label}
      </button>
    )
  }
}
