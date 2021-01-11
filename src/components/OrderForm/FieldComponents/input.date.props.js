import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  renderData: PropTypes.object,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
}

export const defaultProps = {
  minDate: new Date('01-01-2009'),
  maxDate: null,
}
