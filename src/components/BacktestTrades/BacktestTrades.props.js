import PropTypes from 'prop-types'

export const propTypes = {
  onSelectTrade: PropTypes.func,
  trades: PropTypes.array,
}

export const defaultProps = {
  onSelectTrade: () => {},
  trades: [],
}
