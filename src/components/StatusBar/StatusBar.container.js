import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import StatusBar from './StatusBar'
import { getNumberOfLayouts, getRemoteVersion } from '../../redux/selectors/ui'
import { getSocket } from '../../redux/selectors/ws'
import { version } from '../../../package.json'

const mapStateToProps = (state = {}) => {
  const socket = getSocket(state)
  const { meta = {} } = state
  const { data = {} } = meta
  const lastVersion = data.version
  const { status: wsStatus } = socket

  return {
    wsConnected: wsStatus === 'online',
    nLayouts: getNumberOfLayouts(state),
    remoteVersion: getRemoteVersion(state),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
