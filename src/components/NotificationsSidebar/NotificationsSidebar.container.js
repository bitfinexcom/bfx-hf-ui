import { connect } from 'react-redux'

import { getNotifications } from '../../redux/selectors/bfx_data'
import NotificationsSidebar from './NotificationsSidebar'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  notifications: getNotifications(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSidebar)
