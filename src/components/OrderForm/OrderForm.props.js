import PropTypes from 'prop-types'

export const propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  savedState: PropTypes.object.isRequired,
  activeMarket: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  apiClientState: PropTypes.number.isRequired,
  apiCredentials: PropTypes.object.isRequired,
  setIsOrderExecuting: PropTypes.func.isRequired,
  isOrderExecuting: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  showMarket: PropTypes.bool,
}

export const defaultProps = {
  moveable: true,
  removeable: true,
  showMarket: false,
  isOrderExecuting: false,
}
