import React from 'react'
import ClassNames from 'classnames'

import Scrollbars from '../../ui/Scrollbars'
import { propTypes, defaultProps } from './OrderFormModal.props'

export default class OrderFormModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      content, className, icon, title, form, buttons, onClick, titleColor, apiClientConnecting, isModal = true,
    } = this.props

    return (
      <div className={ClassNames([{ 'hfui-orderform__modal-wrapper': isModal, 'hfui-orderform__wrapper-nomodal': !isModal }, className])}>
        <Scrollbars>
          <div
            role='button'
            tabIndex={0}
            className='hfui-orderform__modal-inner fullheight'
            onClick={onClick}
          >
            {icon && (<i className={icon} />)}
            {title && (
              <p
                style={!titleColor ? {} : {
                  color: titleColor,
                }}
              >
                {title}
              </p>
            )}

            {content && (content)}

            {form && (
              <div className='hfui-orderform__modal-form'>
                {form}
              </div>
            )}

            {buttons && (
              <div className='hfui-orderform__modal-buttons'>
                {buttons}
              </div>
            )}

            {apiClientConnecting && (
            <span>
                    Connecting to exhcnage...
            </span>
            )}
          </div>
        </Scrollbars>
      </div>
    )
  }
}
