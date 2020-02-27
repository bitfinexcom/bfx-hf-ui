import { connect } from 'react-redux'

import { getNotifications } from '../../redux/selectors/ws'
import NotificationsSidebar from './NotificationsSidebar'
import UIActions from '../../redux/actions/ui'

const mapStateToProps = (state = {}) => {
  return {
    notifications: getNotifications(state),
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotificationPanel: () => {
    dispatch(UIActions.closeNotificationPanel())
  },
}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSidebar)
