import React from 'react'
import { Notifications } from '@ufx-ui/core'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import Scrollbars from 'react-custom-scrollbars'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import _filter from 'lodash/filter'
import { nonce } from 'bfx-api-node-util'

import Panel from '../../ui/Panel'
import Button from '../../ui/Button'
import './style.css'

const LIVE_NOTIFICATION_LIFETIME_MS = 5000

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
        ...notifications.filter(({ cid }) => !shownNotifications.includes(cid)).map(n => ({
          n: {
            message: n.text,
            level: n.status,
            ...n,
          },
          showMTS,
          id: nonce(),
        })),

        ...prevState.liveNotifications,
      ],
      shownNotifications: notifications.map(({ cid }) => cid),
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

  onClose({ cid, group }) {
    const { removeNotifications } = this.props
    let cids = []

    if (!_isEmpty(group)) {
      cids = _map(group, el => el.cid)
    } else if (!_isEmpty(cid)) {
      cids = [cid]
    }

    this.setState(({ shownNotifications }) => ({
      shownNotifications: _filter(shownNotifications, n => !_includes(cids, n.cid)),
    }))
    removeNotifications(cids)
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
      liveNotifications: _filter(liveNotifications, ({ showMTS }) => showMTS !== shownMTS),
    }))
  }

  render() {
    const { liveNotifications } = this.state
    const { notifications, notificationsVisible, closeNotificationPanel } = this.props

    return (
      <>
        <div className={ClassNames('hfui-notificationssidebar__wrapper', {
          visible: notificationsVisible,
          hidden: !notificationsVisible,
        })}
        >
          <Panel
            label='Notifications'
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
              <Scrollbars height='100%'>
                <Notifications
                  className='hfui-sidebar-notifications'
                  notifications={_map(notifications, item => ({
                    ...item,
                    level: item.status,
                    message: item.text,
                  }))}
                  onClose={this.onClose}
                />
              </Scrollbars>
            )}
          </Panel>
        </div>
        <Notifications className='hfui-notificationssidebar__external' notifications={_map(liveNotifications, item => item.n)} />
      </>
    )
  }
}

NotificationsSidebar.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeNotifications: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  closeNotificationPanel: PropTypes.func.isRequired,
  notificationsVisible: PropTypes.bool,
}

NotificationsSidebar.defaultProps = {
  notificationsVisible: false,
}

export default NotificationsSidebar
