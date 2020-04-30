import PropTypes from 'prop-types'

export const propTypes = {
  activeExchange: PropTypes.string.isRequired,
  activeMarket: PropTypes.object.isRequired,
  addTickerRequirement: PropTypes.func.isRequired,
  onChangeMarket: PropTypes.func.isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  ticker: PropTypes.object.isRequired,
  exchanges: PropTypes.array,
  markets: PropTypes.object,
  showTicker: PropTypes.bool,
  showNotifications: PropTypes.bool,
}

export const defaultProps = {
  exchanges: [],
  markets: {},
  showTicker: true,
  showNotifications: true,
}
