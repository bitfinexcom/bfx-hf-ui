import { connect } from 'react-redux'
import Settings from './Settings'

import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getActiveAlgoOrders } from '../../redux/actions/ao'

import { getAuthToken } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'

const mapStateToProps = (state = {}) => {
  const { ui = {} } = state
  const { settings = {} } = ui
  const { dms, ga } = settings

  return {
    authToken: getAuthToken(state),
    dms,
    ga,
    currentMode: getCurrentMode(state),
  }
}

const mapDispatchToProps = dispatch => ({
  submitAPIKeys: ({
    authToken, apiKey, apiSecret,
  }, mode, currentMode) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      authToken,
      apiKey,
      apiSecret,
      mode,
      currentMode,
    ]))
  },

  gaUpdateSettings: () => {
    dispatch(GAActions.updateSettings())
  },

  updateSettings: ({
    authToken, dms, ga,
  }) => {
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      dms,
      ga,
    ]))
  },

  getActiveAOs: () => dispatch(getActiveAlgoOrders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
