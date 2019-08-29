import PropTypes from 'prop-types'

export const propTypes = {
  results: PropTypes.object.isRequired,
  execRunning: PropTypes.bool.isRequired,
  currentTick: PropTypes.number,
  totalTicks: PropTypes.number,
}

export const defaultProps = {}
