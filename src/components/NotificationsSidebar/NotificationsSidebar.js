import React from 'react'
import ClassNames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import { nonce } from 'bfx-api-node-util'

import Notification from './Notification'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './NotificationsSidebar.props'
import './style.css'

const LIVE_NOTIFICATION_LIFETIME_MS = 4000

export default class NotificationsSidebar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    open: false,
    lastShownMTS: 0,
    lastNotificationCount: 0,
    liveNotifications: [],
    liveNotificationTimeouts: [],
  }

  constructor(props) {
    super(props)

    const { notifications = [] } = props

    this.state = {
      ...this.state,
      lastNotificationCount: notifications.length,
    }

    this.onToggleOpen = this.onToggleOpen.bind(this)
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
      ],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { liveNotifications, lastShownMTS } = this.state

    if (liveNotifications.length === prevState.liveNotifications.length) {
      return
    }

    setTimeout(
      this.timeoutLiveNotifications.bind(this, lastShownMTS),
      LIVE_NOTIFICATION_LIFETIME_MS,
    )
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onToggleOpen() {
    this.setState(({ open }) => ({ open: !open }))
  }

  timeoutLiveNotifications(shownMTS) {
    if (!this.mounted) {
      return
    }

    this.setState(({ liveNotifications }) => ({
      liveNotifications: liveNotifications.filter(({ showMTS }) => (
        showMTS !== shownMTS
      )),
    }))
  }

  render() {
    const { open, liveNotifications } = this.state
    const { notifications } = this.props

    return (
      <div className={ClassNames('hfui-notificationssidebar__wrapper', {
        visible: open,
      })}
      >
        <Panel
          label='NOTIFICATIONS'
          hideIcons
        >
          <ul>
            <Scrollbars height='100%'>
              {notifications.map((n = {}) => (
                <Notification key={`${n.mts}-${n.text}`} data={n} />
              ))}
            </Scrollbars>
          </ul>
        </Panel>

        {!open && (
          <ul className='hfui-notificationssidebar__external'>
            {liveNotifications.map((item = {}) => (
              <Notification key={item.id} data={item.n} />
            ))}
          </ul>
        )}

        <div
          onClick={this.onToggleOpen}
          className='hfui-notificationssidebar__notch'
        >
          <i className='fa fa-bell' />
        </div>
      </div>
    )
  }
}
