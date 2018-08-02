import PropTypes from 'prop-types'

export const propTypes = {
  onSelect: PropTypes.func,
  bts: PropTypes.array,
}

export const defaultProps = {
  onSelect: () => {},
  bts: [],
}
