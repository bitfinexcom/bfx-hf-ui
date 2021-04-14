import { connect } from 'react-redux'

import {
  getActiveMarket, getComponentState, getActiveExchange,
} from '../../redux/selectors/ui'
import { getMarkets } from '../../redux/selectors/meta'
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
    allMarkets: getMarkets(state),
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
