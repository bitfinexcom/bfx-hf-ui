import { connect } from 'react-redux'

import { getNotifications } from '../../redux/selectors/ws'
import NotificationsSidebar from './NotificationsSidebar'

const mapStateToProps = (state = {}) => ({
  notifications: getNotifications(state),
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSidebar)
