import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  renderData: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export const defaultProps = {
  disabled: false,
}
