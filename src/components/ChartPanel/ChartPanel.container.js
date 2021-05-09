import { connect } from 'react-redux'

import ChartPanel from './ChartPanel'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getAuthToken } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'
import { getActiveMarket, getComponentState } from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { favoriteTradingPairs = {} } = state.ws
  const { favoritePairs = [] } = favoriteTradingPairs
  return {
    savedState: getComponentState(state, layoutID, 'trades', id),
    activeMarket: getActiveMarket(state),
    markets: getMarkets(state),
    authToken: getAuthToken(state),
    favoritePairs,
  }
}

const mapDispatchToProps = dispatch => ({
  addTradesRequirement: (market) => {
    dispatch(WSActions.addChannelRequirement(['trades', market]))
  },

  removeTradesRequirement: (market) => {
    dispatch(WSActions.removeChannelRequirement(['trades', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartPanel)
