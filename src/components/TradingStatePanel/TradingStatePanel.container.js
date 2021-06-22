import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getAllOrders,
  getAlgoOrders,
  getPositionsCount,
} from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'
import {
  getAlgoOrdersCount,
  getAtomicOrdersCount,
} from '../../redux/selectors/ui'

import TradingStatePanel from './TradingStatePanel'

const mapStateToProps = (state = {}) => ({
  algoOrders: getAlgoOrders(state),
  atomicOrders: getAllOrders(state),
  algoOrdersCount: getAlgoOrdersCount(state),
  atomicOrdersCount: getAtomicOrdersCount(state),
  getPositionsCount: getPositionsCount(state),
  markets: getMarkets(state),
})

const mapDispatchToProps = dispatch => ({
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingStatePanel)
