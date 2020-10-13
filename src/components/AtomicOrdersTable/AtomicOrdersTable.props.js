import PropTypes from 'prop-types'

export const propTypes = {
  exID: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  filtredAtomicOrders: PropTypes.array.isRequired,
  cancelOrder: PropTypes.func.isRequired,
}

export const defaultProps = {
  filtredAtomicOrders: [],
}
