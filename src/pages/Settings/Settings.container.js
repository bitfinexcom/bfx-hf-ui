import { connect } from 'react-redux'
import Settings from './Settings'

import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import {
  getAPIClientStates, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'

import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'


const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'orderform', id),
    authToken: getAuthToken(state),
    apiCredentials: getAPICredentials(state),
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
      authToken,
      exID,
      apiKey,
      apiSecret,
    ]))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
