import React from 'react'
import ClassNames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import { nonce } from 'bfx-api-node-util'

import Notification from './Notification'
import Panel from '../../ui/Panel'
import './style.css'

const LIVE_NOTIFICATION_LIFETIME_MS = 4000

export default class NotificationsSidebar extends React.Component {
  state = {
    open: false,
    lastShownMTS: 0,
    lastNotificationCount: 0,
    liveNotifications: [],
  }

  constructor (props) {
    super(props)

    const { notifications = [] } = props

    this.state = {
      ...this.state,
      lastNotificationCount: notifications.length,
    }

    this.onToggleOpen = this.onToggleOpen.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { notifications = [] } = nextProps
    const { lastNotificationCount } = prevState

    if (notifications.length === lastNotificationCount) {
      return {}
    }

    const showMTS = Date.now()

    return {
      lastShownMTS: showMTS,
      lastNotificationCount: notifications.length,
      liveNotifications: [
        ...notifications.slice(0, notifications.length - lastNotificationCount).map(n => ({
          n,
          showMTS,
          id: nonce(),
        })),

        ...prevState.liveNotifications,
      ]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { liveNotifications } = this.state

    if (liveNotifications.length === prevState.liveNotifications.length) {
      return
    }

    setTimeout(
      this.timeoutLiveNotifications.bind(this, this.state.lastShownMTS),
      LIVE_NOTIFICATION_LIFETIME_MS
    )
  }

  timeoutLiveNotifications (shownMTS) {
    this.setState(({ liveNotifications }) => ({
      liveNotifications: liveNotifications.filter(({ showMTS }) => (
        showMTS !== shownMTS
      ))
    }))
  }

  onToggleOpen () {
    this.setState(({ open }) => ({ open: !open }))
  }

  render () {
    const { open, liveNotifications } = this.state
    const { notifications } = this.props

    return (
      <div className={ClassNames('dtc-notificationssidebar__wrapper', {
        visible: open,
      })}>
        <Panel
          label='NOTIFICATIONS'
          hideIcons
        >
          <ul>
            <Scrollbars height='100%'>
              {notifications.map((n = {}, i) => (
                <Notification key={i} data={n} />
              ))}
            </Scrollbars>
          </ul>
        </Panel>

        {!open && (
          <ul className='dtc-notificationssidebar__external'>
            {liveNotifications.map((item = {}) => (
              <Notification key={item.id} data={item.n} />
            ))}
          </ul>
        )}

        <div
          onClick={this.onToggleOpen}
          className='dtc-notificationssidebar__notch'
        >
          <i className='fa fa-bell' />
        </div>
      </div>
    )
  }
}
