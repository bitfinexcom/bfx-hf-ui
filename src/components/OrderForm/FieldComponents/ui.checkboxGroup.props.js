import PropTypes from 'prop-types'

export const propTypes = {
  def: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  renderData: PropTypes.object.isRequired,
  fieldData: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export const defaultProps = {}
