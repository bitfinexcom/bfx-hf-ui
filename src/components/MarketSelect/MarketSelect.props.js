import PropTypes from 'prop-types'

export const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  markets: PropTypes.array.isRequired,
}

export const defaultProps = {}
