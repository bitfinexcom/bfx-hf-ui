import PropTypes from 'prop-types'

export const propTypes = {
  orders: PropTypes.object.isRequired,
  savedState: PropTypes.object.isRequired,
  activeMarket: PropTypes.object.isRequired,
  activeExchange: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  onLogin: PropTypes.func,
  apiClientStates: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  demoMode: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  showExchange: PropTypes.bool,
  showMarket: PropTypes.bool,
}

export const defaultProps = {
  demoMode: false,
  moveable: true,
  removeable: true,
  showExchange: false,
  showMarket: false,
}
