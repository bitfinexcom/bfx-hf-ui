import { connect } from 'react-redux'
import Settings from './Settings'

import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'

import {
  getAPIClientStates, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'

import {
  getComponentState, getActiveExchange, getActiveMarket, getCurrentMode,
} from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { ui = {} } = state
  const { settings = {}, firstLogin } = ui
  const {
    chart, theme, dms, ga,
  } = settings || {}

  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'orderform', id),
    authToken: getAuthToken(state),
    apiCredentials: getAPICredentials(state),
    chart,
    theme,
    dms,
    ga,
    firstLogin,
    currentMode: getCurrentMode(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },

  submitAPIKeys: ({
    exID, authToken, apiKey, apiSecret,
  }, mode) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      authToken,
      exID,
      apiKey,
      apiSecret,
      mode,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
