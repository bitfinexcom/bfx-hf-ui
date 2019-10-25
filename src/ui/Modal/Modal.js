import React from 'react'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './Modal.props'
import './style.css'

export default class Modal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      children, className, onClose, fixed, actions, label,
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
          <div className='hfui-modal__header'>
            {label && (
              <p className='hfui-modal__label'>{label}</p>
            )}

            <i
              className='icon-cancel'
              onClick={onClose}
            />
          </div>

          {children}

          {actions && (
            <div className='hfui-modal__actions'>
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  }
}
