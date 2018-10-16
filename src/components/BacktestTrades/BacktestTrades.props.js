import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func,
  trades: PropTypes.array
}

export const defaultProps = {
  onSelect: () => {},
  trades: []
}
