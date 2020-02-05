import { connect } from 'react-redux'

import { getNotifications } from '../../redux/selectors/ws'
import NotificationsSidebar from './NotificationsSidebar'
import UIActions from '../../redux/actions/ui'

const mapStateToProps = (state = {}) => {
  const { ui = {} } = state
  const { isNotificationsOpened } = ui
  return {
    notifications: getNotifications(state),
    isNotificationsOpened,
  }
}

const mapDispatchToProps = dispatch => ({
  toggleNotifications: (currState) => {
    dispatch(UIActions.toggleNotifications(currState))
  },
}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSidebar)
