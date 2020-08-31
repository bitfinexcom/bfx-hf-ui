import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import StatusBar from './StatusBar'
import { getNumberOfLayouts, getRemoteVersion } from '../../redux/selectors/ui'
import { getSocket, getAPIClientStates } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}) => {
  const socket = getSocket(state)
  const { status: wsStatus } = socket
  const { ui } = state
  const exchange = ui.activeExchange
  const { feedbackVisible } = ui

  return {
    wsConnected: wsStatus === 'online',
    nLayouts: getNumberOfLayouts(state),
    remoteVersion: getRemoteVersion(state),
    apiClientStates: getAPIClientStates(state),
    currentExchange: exchange,
    feedbackVisible,
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },
  toggleFeedback: (status) => {
    dispatch({ type: 'UI_TOGGLE_FEEDBACK', payload: status })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
