import { connect } from 'react-redux'
import AlgoOrdersView from './AlgoOrders'
import DataActions from '../../redux/actions/data'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { dataHF = {}, table = {} } = state
  const { bfx = {}, candles = {}, } = dataHF
  const { orders = [] } = bfx

  const { algoOrders = [] } = table
  const { editorOpened } = state.editor

  return {
    allCandles: candles,
    algoOrders,
    orders,
    editorOpened,
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (symbol, tf, range) => {
    dispatch(DataActions.syncCandles(symbol, tf, range))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgoOrdersView)
