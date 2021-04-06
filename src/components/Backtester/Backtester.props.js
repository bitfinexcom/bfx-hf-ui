import PropTypes from 'prop-types'

export const propTypes = {
  indicators: PropTypes.array,
  backtest: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    executing: PropTypes.bool.isRequired,
  }),
  backtestData: PropTypes.shape({
    trades: PropTypes.array.isRequired,
    candles: PropTypes.array.isRequired,
  }),
  strategyContent: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
  ),
  allMarkets: PropTypes.object,
  backtestResults: PropTypes.object,
  backtestOptions: PropTypes.object,
  authToken: PropTypes.string.isRequired,
  dsExecuteBacktest: PropTypes.func.isRequired,
  setBacktestOptions: PropTypes.func.isRequired,
}

export const defaultProps = {
  indicators: [],
  backtest: {
    loading: true,
    executing: false,
  },
  backtestData: {
    trades: [],
    candles: [],
  },
  strategyContent: {},
  allMarkets: {},
  backtestResults: {},
  backtestOptions: {},
}
