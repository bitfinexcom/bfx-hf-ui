import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import _isEmpty from 'lodash/isEmpty'
import { nonce } from 'bfx-api-node-util'

import Notification from './Notification'
import Panel from '../../ui/Panel'
import Button from '../../ui/Button'
import './style.css'

const LIVE_NOTIFICATION_LIFETIME_MS = 4000

class NotificationsSidebar extends React.PureComponent {
  state = {
    lastShownMTS: 0,
    liveNotifications: [],
    shownNotifications: [],
  }

  constructor(props) {
    super(props)

    this.onClose = this.onClose.bind(this)
    this.onClearNotifications = this.onClearNotifications.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { notifications = [] } = nextProps
    const { shownNotifications } = prevState

    if (notifications.length <= shownNotifications.length) {
      return {}
    }

    const showMTS = Date.now()

    return {
      lastShownMTS: showMTS,
      liveNotifications: [
        ...notifications.filter(({ uid }) => !shownNotifications.includes(uid)).map(n => ({
          n,
          showMTS,
          id: nonce(),
        })),

        ...prevState.liveNotifications,
      ],
      shownNotifications: notifications.map(({ uid }) => uid),
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

  onClose(uid) {
    const { removeNotification } = this.props
    removeNotification(uid)

    this.setState(({ shownNotifications }) => ({
      shownNotifications: shownNotifications.filter(n => n.uid !== uid),
    }))
  }

  onClearNotifications() {
    const { clearNotifications } = this.props
    clearNotifications()

    setTimeout(() => {
      this.setState({
        shownNotifications: [],
      })
    }, 1000)
  }

  timeoutLiveNotifications(shownMTS) {
    this.setState(({ liveNotifications }) => ({
      liveNotifications: liveNotifications.filter(({ showMTS }) => showMTS !== shownMTS),
    }))
  }

  render() {
    const { liveNotifications } = this.state
    const { notifications, notificationsVisible, closeNotificationPanel } = this.props

    return (
      <div className={ClassNames(`hfui-notificationssidebar__wrapper ${notificationsVisible ? 'absoulute' : ''}`, {
        visible: notificationsVisible,
      })}
      >
        <Panel
          label='NOTIFICATIONS'
          hideIcons
          closePanel={closeNotificationPanel}
          preHeaderComponents={[
            <Button
              onClick={this.onClearNotifications}
              key='clear-btn'
              disabled={_isEmpty(notifications)}
              className='hfui-notificationssidebar__header-btn'
              label={[
                <i key='icon' className='icon-clear' />,
                <p key='text'>Clear all</p>,
              ]}
            />,
          ]}
        >
          {_isEmpty(notifications) ? (
            <p className='hfui-notificationssidebar__empty'>There are no new notifications yet!</p>
          ) : (
            <ul>
              <Scrollbars height='100%'>
                {notifications.map((n = {}) => (
                  <Notification key={n.uid || n.mts} data={n} onClose={this.onClose} />
                ))}
              </Scrollbars>
            </ul>
          )}
        </Panel>

        <ul className='hfui-notificationssidebar__external'>
          {liveNotifications.map((item = {}) => (
            <Notification key={item.id} data={item.n} />
          ))}
        </ul>
      </div>
    )
  }
}

NotificationsSidebar.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeNotification: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  closeNotificationPanel: PropTypes.func.isRequired,
  notificationsVisible: PropTypes.bool,
}

NotificationsSidebar.defaultProps = {
  notificationsVisible: false,
}

export default NotificationsSidebar
