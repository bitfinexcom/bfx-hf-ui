import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  renderData: PropTypes.object,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.string,
}

export const defaultProps = {}
