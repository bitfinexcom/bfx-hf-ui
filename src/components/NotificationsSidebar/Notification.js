import React, { useState, memo } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import _includes from 'lodash/includes'
import _toLower from 'lodash/toLower'

import check from './icons/check.svg'
import error from './icons/error.svg'
import clear from './icons/clear.svg'
import info from './icons/info.svg'
import pass from './icons/password.svg'

const getIcon = (status, text) => {
  switch (status) {
    case 'success':
      return <img src={check} alt='check' />

    case 'error':
      if (_includes(_toLower(text), 'invalid password')) {
        return <img src={pass} alt='password error' />
      }
      return <img src={error} alt='error' />

    case 'info':
      if (_includes(_toLower(text), 'cleared user credentials & data')) {
        return <img src={clear} alt='clear' />
      }
      return <img src={info} alt='info' />

    default:
      return <img src={check} alt='check' />
  }
}

const Notification = memo(({ data, onClose }) => {
  const [state, setState] = useState('OPENED')

  const close = () => {
    const { uid } = data

    if (state === 'OPENED') {
      onClose(uid)
      setState('CLOSED')
    }
  }

  const { status, text, mts } = data
  const icon = getIcon(status, text)

  return (
    <li className={ClassNames('hfui-notification', {
      [_toLower(status)]: true,
      closed: state === 'CLOSED',
    })}
    >
      <p className='hfui-notification__close' onClick={close}>&#10005;</p>
      <div className='hfui-notification-icon'>
        {icon}
      </div>
      <div className='hfui-notification-data'>
        <p className='hfui-notification-msg'>{text}</p>
        <p className='hfui-notification__ts'>{new Date(mts).toLocaleString()}</p>
      </div>
    </li>
  )
})

Notification.INTENT_SUCCESS = 'success'
Notification.INTENT_WARNING = 'warning'
Notification.INTENT_ERROR = 'error'
Notification.INTENT_INFO = 'info'

Notification.displayName = 'Notification'

Notification.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])).isRequired,
  onClose: PropTypes.func,
}

Notification.defaultProps = {
  onClose: () => { },
}

export default Notification
