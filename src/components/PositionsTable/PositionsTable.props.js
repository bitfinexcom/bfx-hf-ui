import PropTypes from 'prop-types'

export const propTypes = {
  closePosition: PropTypes.func.isRequired,
  positions: PropTypes.array.isRequired,
  exID: PropTypes.string.isRequired,
}

export const defaultProps = {}
