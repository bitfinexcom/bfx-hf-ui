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
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { ui = {} } = state
  const { settings = {} } = ui
  const {
    chart, theme, dms, ga, bgStrategyExec,
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
    bgStrategyExec,
    chart,
    theme,
    dms,
    ga,
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
  }) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      apiSecret,
      authToken,
      apiKey,
      exID,
    ]))
  },

  gaUpdateSettings: () => {
    dispatch(GAActions.updateSettings())
  },

  updateSettings: ({
    authToken, chart, dms, theme, ga, bgStrategyExec,
  }) => {
    dispatch(WSActions.send([
      'settings.update',
      bgStrategyExec,
      authToken,
      theme,
      chart,
      dms,
      ga,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
