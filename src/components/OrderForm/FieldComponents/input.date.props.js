import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  renderData: PropTypes.object.isRequired,
  value: PropTypes.date.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.string,
}

export const defaultProps = {}
