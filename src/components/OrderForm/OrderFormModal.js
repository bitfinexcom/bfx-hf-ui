import React from 'react'
import ClassNames from 'classnames'

import Scrollbars from '../../ui/Scrollbars'

export default class OrderFormModal extends React.PureComponent {
  render () {
    const {
      content, className, icon, title, form, buttons, onClick
    } = this.props

    return (
      <div className={ClassNames('dtc-orderform__modal-wrapper', className)}>
        <Scrollbars>
          <div className='dtc-orderform__modal-inner fullheight' onClick={onClick}>
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
