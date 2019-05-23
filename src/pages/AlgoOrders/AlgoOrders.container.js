import { connect } from 'react-redux'
import AlgoOrdersView from './AlgoOrders'
import DataActions from '../../redux/actions/data'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { candles = {} } = data

  return {
    allCandles: candles,
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (symbol, tf, range) => {
    dispatch(DataActions.syncCandles(symbol, tf, range))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersView)
