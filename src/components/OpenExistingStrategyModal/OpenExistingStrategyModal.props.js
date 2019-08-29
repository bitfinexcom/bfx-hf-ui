import PropTypes from 'prop-types'

export const propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  strategies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export const defaultProps = {}
