import React from 'react'
import ClassNames from 'classnames'
// import { Icon } from 'react-fa'
import check from './check.svg'
import error from './error.svg'
import clear from './clear.svg'
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

    switch (status) {
      case 'success':
        icon = <img src={check} alt='check' />
        break

      case 'error':
        if (text.toLowerCase().includes('invalid password')) {
          icon = <img src={pass} alt='password error' />
        } else {
          icon = <img src={error} alt='error' />
        }

        break

      case 'info':
        if (text.toLowerCase().includes('cleared user credentials & data')) {
          icon = <img src={clear} alt='clear' />
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
        <div className='hfui-notification-icon'>
          {icon}
        </div>

        <div className='hfui-notification-data'>
          <p className='hfui-notification__close' onClick={() => this.closeNotification()}>X</p>
          <p className='nfui-notification-msg'>{text}</p>
          <p className='hfui-notification__ts'>{`${new Date(mts).toLocaleString()}`}</p>
        </div>
      </li>
    )
  }
}
