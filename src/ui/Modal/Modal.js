import React from 'react'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './Modal.props'
import './style.css'

export default class Modal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      children, className, onClose, fixed,
    } = this.props

    return (
      <div
        className={ClassNames('hfui-modal__wrapper', { fixed })}
        onClick={onClose}
      >
        <div
          className={ClassNames('hfui-modal__content', className)}
          onClick={(e) => {
            e.stopPropagation()
            return false
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}
