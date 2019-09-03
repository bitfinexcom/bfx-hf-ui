import PropTypes from 'prop-types'

export const propTypes = {
  orders: PropTypes.object.isRequired,
  savedState: PropTypes.object.isRequired,
  activeMarket: PropTypes.object.isRequired,
  activeExchange: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  apiClientStates: PropTypes.object.isRequired,
  apiCredentials: PropTypes.object.isRequired,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  showExchange: PropTypes.bool,
  showMarket: PropTypes.bool,
}

export const defaultProps = {
  moveable: true,
  removeable: true,
  showExchange: false,
  showMarket: false,
}
