import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  renderData: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export const defaultProps = {
  disabled: false,
}
