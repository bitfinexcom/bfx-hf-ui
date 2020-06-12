import PropTypes from 'prop-types'

export const propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  orders: PropTypes.array,
  apiClientState: PropTypes.number.isRequired,
}

export const defaultProps = {
  orders: [],
}
