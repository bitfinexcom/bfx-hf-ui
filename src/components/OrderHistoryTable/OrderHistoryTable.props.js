import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  orders: PropTypes.array.isRequired,
}

export const defaultProps = {}
