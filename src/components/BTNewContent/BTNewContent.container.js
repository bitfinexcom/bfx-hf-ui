import { connect } from 'react-redux'
import BTNewContent from './BTNewContent'
import DataActions from '../../redux/actions/data'
import getCandles from '../../redux/selectors/candles'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { data = {} } = state
  const { symbol, tf, range } = ownProps

  // TODO: Filter against range
  const candles = getCandles(state, symbol, tf, 'trade')

  return {
    candles,
  }
}

const mapDispatchToProps = dispatch => ({
  syncCandles: (symbol, tf, range) => {
    dispatch(DataActions.syncCandles(symbol, tf, range))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BTNewContent)
