import PropTypes from 'prop-types'

export const propTypes = {
  results: PropTypes.object,
  execRunning: PropTypes.bool.isRequired,
  currentTick: PropTypes.number,
  totalTicks: PropTypes.number,
}

export const defaultProps = {}
