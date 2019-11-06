import PropTypes from 'prop-types'

export const propTypes = {
  onSave: PropTypes.func.isRequired,
  onIndicatorsChange: PropTypes.func.isRequired,
  onResultsChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  authenticated: PropTypes.bool,
  renderResults: PropTypes.bool,
}

export const defaultProps = {
  moveable: false,
  removeable: false,
  renderResults: true,
}
