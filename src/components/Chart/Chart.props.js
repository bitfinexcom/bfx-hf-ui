import PropTypes from 'prop-types'

export const propTypes = {
  indicators: PropTypes.array,
  indicatorData: PropTypes.object,
  candles: PropTypes.array,
  trades: PropTypes.array,
  focusMTS: PropTypes.number,
  label: PropTypes.string,
  showIndicatorControls: PropTypes.bool,
  showOrders: PropTypes.bool,
  showPositions: PropTypes.bool,
  canChangeMarket: PropTypes.bool,
  canChangeExchange: PropTypes.bool,
  showMarket: PropTypes.bool,
  showExchange: PropTypes.bool,
  dark: PropTypes.bool,
}

export const defaultProps = {
  indicators: [],
  indicatorData: {},
  candles: [],
  trades: [],
  focusMTS: null,
  label: 'CHART',
  showIndicatorControls: true,
  showOrders: true,
  showPositions: true,
  canChangeMarket: true,
  canChangeExchange: true,
  showMarket: true,
  showExchange: true,
  dark: false,
}
