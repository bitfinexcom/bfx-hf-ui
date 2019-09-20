import PropTypes from 'prop-types'

export const propTypes = {
  i: PropTypes.object.isRequired, // TODO: Rename prop
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export const defaultProps = {}
