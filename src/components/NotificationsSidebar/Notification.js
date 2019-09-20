import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './Notification.props'

export default class Notification extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  static INTENT_SUCCESS = 'success'
  static INTENT_WARNING = 'warning'
  static INTENT_ERROR = 'error'
  static INTENT_INFO = 'info'

  render() {
    const { data = {} } = this.props
    const { status, text, mts } = data

    return (
      <li className={ClassNames('hfui-notification', {
        [status.toLowerCase()]: true,
      })}
      >
        <p>{text}</p>
        <p className='hfui-notification__ts'>{new Date(mts).toLocaleString()}</p>
      </li>
    )
  }
}
