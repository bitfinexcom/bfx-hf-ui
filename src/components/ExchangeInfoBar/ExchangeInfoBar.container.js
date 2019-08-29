import { connect } from 'react-redux'

import WSDTCActions from '../../redux/actions/ws_dtc_server'
import UIActions from '../../redux/actions/ui'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'
import { getTicker } from '../../redux/selectors/ws_dtc_server'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'

import ExchangeInfoBar from './ExchangeInfoBar'

const mapStateToProps = (state = {}) => {
  const activeExchange = getActiveExchange(state)
  const activeMarket = getActiveMarket(state)

  return {
    activeExchange,
    activeMarket,
    ticker: getTicker(state, activeExchange, activeMarket),
    exchanges: getExchanges(state),
    markets: getMarkets(state),
  }
}

const mapDispatchToProps = dispatch => ({
  addTickerRequirement: (exchange, market) => {
    dispatch(WSDTCActions.addChannelRequirement(exchange, ['ticker', market]))
  },

  onChangeMarket: (exchange, market, prevMarket) => {
    dispatch(WSDTCActions.removeChannelRequirement(exchange, ['ticker', prevMarket]))
    dispatch(UIActions.setActiveMarket(market))
    dispatch(WSDTCActions.addChannelRequirement(exchange, ['ticker', market]))
  },

  onChangeExchange: (prevExchange, exchange, prevMarket, market) => {
    dispatch(WSDTCActions.removeChannelRequirement(prevExchange, ['ticker', prevMarket]))
    dispatch(UIActions.setActiveExchange(exchange, market))
    dispatch(WSDTCActions.addChannelRequirement(exchange, ['ticker', market]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeInfoBar)
