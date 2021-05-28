import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import Scrollbars from '../../ui/Scrollbars'

const OrderFormModal = ({
  content, className, icon, title, form, buttons, onClick, titleColor, apiClientConnecting, isModal,
}) => (
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
            Connecting to exchange...
          </span>
        )}
      </div>
    </Scrollbars>
  </div>
)

OrderFormModal.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string,
  ]),
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  form: PropTypes.oneOfType([
    PropTypes.node, PropTypes.arrayOf(PropTypes.node),
  ]),
  buttons: PropTypes.oneOfType([
    PropTypes.node, PropTypes.arrayOf(PropTypes.node),
  ]),
  onClick: PropTypes.func,
  isModal: PropTypes.bool,
  apiClientConnecting: PropTypes.bool,
  titleColor: PropTypes.string,
}

OrderFormModal.defaultProps = {
  isModal: true,
  apiClientConnecting: false,
  titleColor: '',
  onClick: () => {},
  title: '',
  icon: '',
  className: '',
  content: null,
  form: null,
  buttons: null,
}

export default memo(OrderFormModal)
