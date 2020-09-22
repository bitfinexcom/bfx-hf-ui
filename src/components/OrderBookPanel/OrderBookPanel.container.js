import { connect } from 'react-redux'

import {
  getActiveMarket, getComponentState, getActiveExchange,
} from '../../redux/selectors/ui'

import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'

import OrderBookPanel from './OrderBookPanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)

  return {
    activeExchange,
    activeMarket,
    savedState: getComponentState(state, layoutID, 'book', id),
    exchanges: getExchanges(state),
    allMarkets: getMarkets(state),
    lang: state.ui.lang,
  }
}

const mapDispatchToProps = dispatch => ({
  addOBRequirement: (exchange, market) => {
    dispatch(WSActions.addChannelRequirement(exchange, ['book', market]))
  },

  removeOBRequirement: (exchange, market) => {
    dispatch(WSActions.removeChannelRequirement(exchange, ['book', market]))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookPanel)
