import { connect } from 'react-redux'

import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getUser } from '../../redux/selectors/ws_dtc_server'

import Navbar from './Navbar'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(WSDTCActions.deauth())
    dispatch(WSDTCActions.send(['deauth']))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
