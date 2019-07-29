import PropTypes from 'prop-types'

export const propTypes = {
  colors: PropTypes.object,
  indicators: PropTypes.object,
  onIndicatorSaved: PropTypes.func,
  onIndicatorUpdated: PropTypes.func,
  onIndicatorDeleted: PropTypes.func,
}

export const defaultProps = {
  colors: {},
  indicators: {},
  onIndicatorSaved: () => {},
  onIndicatorUpdated: () => {},
  onIndicatorDeleted: () => {},
}
