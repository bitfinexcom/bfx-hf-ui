import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './style.css'

export default class Modal extends React.PureComponent {
  static propTypes = {
    fixed: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  }

  static defaultProps = {
    label: '',
    fixed: true,
    actions: [],
    className: '',
  }

  render() {
    const {
      fixed,
      label,
      onClose,
      actions,
      children,
      className,
    } = this.props

    return (
      <div
        className={ClassNames('hfui-modal__wrapper', { fixed })}
        onClick={(e) => {
          e.stopPropagation()
          return false
        }}
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
