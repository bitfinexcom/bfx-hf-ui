import { connect } from 'react-redux'
import AlgoOrdersView from './AlgoOrders'
import DataActions from '../../redux/actions/data'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { bfx = {}, candles = {}, algoOrders = [] } = data
  const { orders = [] } = bfx

  return {
    allCandles: candles,
    algoOrders,
    orders,
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (symbol, tf, range) => {
    setTimeout(() => {
      dispatch(DataActions.syncCandles(symbol, tf, range))
    }, 5000)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersView)
