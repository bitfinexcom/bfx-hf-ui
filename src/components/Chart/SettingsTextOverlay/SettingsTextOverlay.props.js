import PropTypes from 'prop-types'

export const propTypes = {
  onClick: PropTypes.func.isRequired,
  forLabel: PropTypes.string,
  color: PropTypes.string,
  positionY: PropTypes.number.isRequired,
  chartWidth: PropTypes.number.isRequired,
  right: PropTypes.bool,
}

export const defaultProps = {
  forLabel: '',
  color: '#fcd206',
}
