import { connect } from 'react-redux'
import BTHistoricalContent from './BTHistoricalContent'
import DataActions from '../../redux/actions/data'
import getCandles from '../../redux/selectors/candles'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { bt } = ownProps

  if (!bt) {
    return {}
  }

  // TODO: Filter against range
  const { symbol, tf } = bt
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

export default connect(mapStateToProps, mapDispatchToProps)(BTHistoricalContent)
