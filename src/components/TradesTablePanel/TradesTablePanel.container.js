import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getMarkets } from '../../redux/selectors/meta'
import { getAuthToken } from '../../redux/selectors/ws'
import {
  getActiveMarket, getComponentState, getMarketTrades,
} from '../../redux/selectors/ui'

import TradesTablePanel from './TradesTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const allMarketTrades = getMarketTrades(state)
  return {
    allMarketTrades,
    markets: getMarkets(state),
    authToken: getAuthToken(state),
    activeMarket: getActiveMarket(state),
    savedState: getComponentState(state, layoutID, 'trades', id),
  }
}

const mapDispatchToProps = dispatch => ({
  updateState: (layoutID, componentID, state) => {
    dispatch(UIActions.updateComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradesTablePanel)
