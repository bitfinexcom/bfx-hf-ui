import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func,
  strategies: PropTypes.array,
  orders: PropTypes.array,
  rowData: PropTypes.object,
}

export const defaultProps = {
  onSelect: () => {},
  strategies: [],
  orders: [],
}
