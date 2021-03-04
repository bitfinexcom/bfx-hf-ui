import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getSocket, getAuthConfigured } from '../../redux/selectors/ws'
import Authentication from './Authentication'

const mapStateToProps = (state = {}) => {
  const socket = getSocket(state)
  const { status: wsStatus } = socket
  const { isPaperTrading } = state.ui

  return {
    wsConnected: wsStatus === 'online',
    configured: getAuthConfigured(state),
    isPaperTrading,
  }
}

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  onInit: (password) => {
    dispatch(WSActions.initAuth(password))
    dispatch(UIActions.firstLogin())
  },

  onUnlock: (password, mode) => {
    const isPaperTrading = mode === 'paper'
    dispatch(WSActions.auth(password, mode))
    dispatch(UIActions.setMarketFromStore(isPaperTrading))
    dispatch(UIActions.setTradingMode(isPaperTrading))
  },

  onReset: () => {
    dispatch(WSActions.resetAuth())
    window.localStorage.clear()
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
