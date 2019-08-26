import { connect } from 'react-redux'
import AlgoOrdersView from './AlgoOrders'
import DataActions from '../../redux/actions/data'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { dataHF = {}, table = {} } = state
  const { bfx = {}, candles = {}, } = dataHF
  const { orders = [] } = bfx

  const { algoOrders = [
    [42, 'bfx-ping_pong', true, null, 'Default'],
    [42, 'bfx-iceberg', true, null, 'Default'],
    [42, 'bfx-twap', true, null, 'Default'],
    [42, 'bfx-accumulate_distribute', true, null, 'Default'],
  ] } = table
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
