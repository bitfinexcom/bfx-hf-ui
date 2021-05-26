import { connect } from 'react-redux'

import StatusBar from './StatusBar'
import { getRemoteVersion } from '../../redux/selectors/ui'
import { getSocket, getAPIClientState } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}) => {
  const socket = getSocket()(state)
  const { status: wsStatus } = socket

  return {
    wsConnected: wsStatus === 'online',
    remoteVersion: getRemoteVersion(state),
    apiClientState: getAPIClientState(state),
  }
}

export default connect(mapStateToProps)(StatusBar)
