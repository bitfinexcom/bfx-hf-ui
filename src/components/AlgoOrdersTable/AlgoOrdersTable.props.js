import PropTypes from 'prop-types'

export const propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  apiClientState: PropTypes.number.isRequired,
}

export const defaultProps = {}
