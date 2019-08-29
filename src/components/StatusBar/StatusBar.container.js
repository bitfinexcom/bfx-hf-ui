import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import StatusBar from './StatusBar'
import { getNumberOfLayouts } from '../../redux/selectors/ui'
import { getSocket, getUser } from '../../redux/selectors/ws_dtc_server'

const mapStateToProps = (state = {}) => {
  const socketDTC = getSocket(state)
  const { status: dtcStatus } = socketDTC

  return {
    dtcConnected: dtcStatus === 'online',
    user: getUser(state),
    nLayouts: getNumberOfLayouts(state),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
