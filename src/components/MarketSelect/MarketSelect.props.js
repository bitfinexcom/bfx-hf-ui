import PropTypes from 'prop-types'

export const propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  markets: PropTypes.array.isRequired,
  renderLabel: PropTypes.bool.isRequired,
}

export const defaultProps = {
  renderLabel: false,
}
