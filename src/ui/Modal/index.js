import React from 'react'
import ClassNames from 'classnames'
import './style.css'

export default class Modal extends React.PureComponent {
  render () {
    const { children, className = '', onClose, fixed } = this.props

    return (
      <div
        className={ClassNames('dtc-modal__wrapper', { fixed })}
        onClick={onClose}
      >
        <div
          className={ClassNames('dtc-modal__content', className)}
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
