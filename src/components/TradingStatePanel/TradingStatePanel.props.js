import PropTypes from 'prop-types'

export const propTypes = {
  layoutID: PropTypes.string.isRequired,
  layoutI: PropTypes.string.isRequired,
  savedState: PropTypes.object.isRequired,
  saveState: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  activeExchange: PropTypes.string.isRequired,
  activeMarket: PropTypes.object.isRequired,
  atomicOrders: PropTypes.object.isRequired,
  algoOrders: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
  balances: PropTypes.object.isRequired,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  positionsCount: PropTypes.number,
  algoOrdersCount: PropTypes.number,
  atomicOrdersCount: PropTypes.number,
}

export const defaultProps = {
  positionsCount: 0,
  algoOrdersCount: 0,
  atomicOrdersCount: 0,
}
