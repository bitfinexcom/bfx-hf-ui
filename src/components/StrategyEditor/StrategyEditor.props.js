import PropTypes from 'prop-types'

export const propTypes = {
  onSave: PropTypes.func.isRequired,
  onIndicatorsChange: PropTypes.func.isRequired,
  onResultsChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  authenticated: PropTypes.bool,
  demoMode: PropTypes.bool,
  user: PropTypes.object.isRequired,
}

export const defaultProps = {
  moveable: false,
  removeable: false,
}
