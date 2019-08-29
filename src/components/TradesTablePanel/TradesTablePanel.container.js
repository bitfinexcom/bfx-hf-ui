import { connect } from 'react-redux'

import TradesTablePanel from './TradesTablePanel'
import UIActions from '../../redux/actions/ui'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import {
  getActiveMarket, getComponentState, getActiveExchange,
} from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)

  return {
    activeExchange,
    savedState: getComponentState(state, layoutID, 'trades', id),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    allMarkets: getMarkets(state),
  }
}

const mapDispatchToProps = dispatch => ({
  addTradesRequirement: (exchange, market) => {
    dispatch(WSDTCActions.addChannelRequirement(exchange, ['trades', market]))
  },

  removeTradesRequirement: (exchange, market) => {
    dispatch(WSDTCActions.removeChannelRequirement(exchange, ['trades', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradesTablePanel)
