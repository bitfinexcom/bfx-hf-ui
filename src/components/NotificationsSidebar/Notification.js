import React from 'react'
import ClassNames from 'classnames'

export default class Notification extends React.PureComponent {
  static INTENT_SUCCESS = 'success'
  static INTENT_WARNING = 'warning'
  static INTENT_ERROR = 'error'
  static INTENT_INFO = 'info'

  render () {
    const { data = {} } = this.props
    const { status, text, mts } = data

    return (
      <li className={ClassNames('dtc-notification', {
        [status.toLowerCase()]: true
      })}>
        <p>{text}</p>
        <p className='dtc-notification__ts'>{new Date(mts).toLocaleString()}</p>
      </li>
    )
  }
}
