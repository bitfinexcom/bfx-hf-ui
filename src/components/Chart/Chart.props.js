import PropTypes from 'prop-types'

export const propTypes = {
  indicators: PropTypes.array,
  indicatorData: PropTypes.object,
  candles: PropTypes.array,
  trades: PropTypes.array,
  focusMTS: PropTypes.number,
}

export const defaultProps = {
  indicators: [],
  indicatorData: {},
  candles: [],
  trades: [],
  focusMTS: null,
}
