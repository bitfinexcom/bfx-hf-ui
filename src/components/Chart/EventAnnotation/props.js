import PropTypes from 'prop-types'

export const propTypes = {
  when: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired,
  stroke: PropTypes.string,
}

export const defaultProps = {
  stroke: '#FFFFFF',
}
