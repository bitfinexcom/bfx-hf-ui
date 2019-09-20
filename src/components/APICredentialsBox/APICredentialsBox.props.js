import PropTypes from 'prop-types'

export const propTypes = {
  exID: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onClear: PropTypes.func.isRequired,
}

export const defaultProps = {}
