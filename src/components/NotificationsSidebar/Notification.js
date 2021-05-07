import React from 'react'
import ClassNames from 'classnames'
import _includes from 'lodash/includes'
import _toLower from 'lodash/toLower'
// import { Icon } from 'react-fa'
import check from './check.svg'
import error from './error.svg'
import clear from './clear.svg'
import info from './info.svg'
import pass from './password.svg'

import { propTypes, defaultProps } from './Notification.props'

export default class Notification extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  static INTENT_SUCCESS = 'success'
  static INTENT_WARNING = 'warning'
  static INTENT_ERROR = 'error'
  static INTENT_INFO = 'info'
  state = {
    NOTIFICATION_STATE: 'OPENED',
  }
  closeNotification() {
    const { NOTIFICATION_STATE } = this.state
    if (NOTIFICATION_STATE === 'OPENED') {
      this.setState({
        NOTIFICATION_STATE: 'CLOSED',
      })
    }
  }
  render() {
    const { data = {} } = this.props
    const { status, text, mts } = data
    const { NOTIFICATION_STATE } = this.state

    let icon
    console.log('TCL: Notification -> render -> status', status)

    switch (status) {
      case 'success':
        icon = <img src={check} alt='check' />
        break

      case 'error':
        if (_includes(_toLower(text), 'invalid password')) {
          icon = <img src={pass} alt='password error' />
        } else {
          icon = <img src={error} alt='error' />
        }

        break

      case 'info':
        if (_includes(_toLower(text), 'cleared user credentials & data')) {
          icon = <img src={clear} alt='clear' />
        } else {
          icon = <img src={info} alt='info' />
        }

        break

      default:
        icon = <img src={check} alt='check' />
        break
    }

    return (
      <li className={ClassNames(`hfui-notification ${NOTIFICATION_STATE === 'OPENED' ? '' : 'closed'}`, {
        [status.toLowerCase()]: true,
      })}
      >
        <p className='hfui-notification__close' onClick={() => this.closeNotification()}>&#10005;</p>
        <div className='hfui-notification-icon'>
          {icon}
        </div>
        <div className='hfui-notification-data'>
          <p className='hfui-notification-msg'>{text}</p>
          <p className='hfui-notification__ts'>{`${new Date(mts).toLocaleString()}`}</p>
        </div>
      </li>
    )
  }
}
