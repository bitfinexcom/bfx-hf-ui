import PropTypes from 'prop-types'

export const propTypes = {
  savedState: PropTypes.object.isRequired,
  saveState: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  layoutID: PropTypes.string.isRequired,
  layoutI: PropTypes.string.isRequired,
  exchanges: PropTypes.array.isRequired,
}

export const defaultProps = {}
