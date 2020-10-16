import { connect } from 'react-redux'

import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'
import { getAlgoOrders } from '../../redux/selectors/ws'
import { getExchanges } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'

import AlgoOrdersTablePanel from './AlgoOrdersTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)

  return {
    activeExchange,
    savedState: getComponentState(state, layoutID, 'atomic-orders', id),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    algoOrders: getAlgoOrders(state),
  }
}

const mapDispatchToProps = dispatch => ({
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersTablePanel)
