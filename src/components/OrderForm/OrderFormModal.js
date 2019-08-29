import React from 'react'
import ClassNames from 'classnames'

import Scrollbars from '../../ui/Scrollbars'
import { propTypes, defaultProps } from './OrderFormModal.props'

export default class OrderFormModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      content, className, icon, title, form, buttons, onClick,
    } = this.props

    return (
      <div className={ClassNames('dtc-orderform__modal-wrapper', className)}>
        <Scrollbars>
          <div
            role='button'
            tabIndex={0}
            className='dtc-orderform__modal-inner fullheight'
            onClick={onClick}
          >
            {icon && (<i className={icon} />)}
            {title && (<p>{title}</p>)}

            {content && (content)}

            {form && (
              <div className='dtc-orderform__modal-form'>
                {form}
              </div>
            )}

            {buttons && (
              <div className='dtc-orderform__modal-buttons'>
                {buttons}
              </div>
            )}
          </div>
        </Scrollbars>
      </div>
    )
  }
}
