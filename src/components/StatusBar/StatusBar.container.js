import { connect } from 'react-redux'

import StatusBar from './StatusBar'
import { getNumberOfLayouts, getRemoteVersion } from '../../redux/selectors/ui'
import { getSocket, getAPIClientStates } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}) => {
  const socket = getSocket()(state)
  const { status: wsStatus } = socket

  return {
    wsConnected: wsStatus === 'online',
    nLayouts: getNumberOfLayouts(state),
    remoteVersion: getRemoteVersion(state),
    apiClientState: getAPIClientStates(state).bitfinex,
  }
}

export default connect(mapStateToProps)(StatusBar)
