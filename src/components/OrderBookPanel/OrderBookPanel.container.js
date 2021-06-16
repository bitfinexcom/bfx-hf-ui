import { connect } from 'react-redux'

import {
  getActiveMarket, getComponentState, getMarketComponents,
} from '../../redux/selectors/ui'
import { DEFAULT_TRADING_KEY } from '../GridLayout/GridLayout.helpers'
import { getMarkets } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'

import OrderBookPanel from './OrderBookPanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const isTradingTerminal = layoutID === DEFAULT_TRADING_KEY

  return {
    activeMarket: getActiveMarket(state),
    savedState: getComponentState(state, layoutID, 'book', id),
    markets: getMarkets(state),
    isTradingTerminal,
    allMarketBooks: getMarketComponents(state, 'book'),
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookPanel)
