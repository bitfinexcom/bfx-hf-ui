import PropTypes from 'prop-types'

export const propTypes = {
  authToken: PropTypes.string,
  savedState: PropTypes.object,
  activeExchange: PropTypes.string,
  chart: PropTypes.string,
  theme: PropTypes.string,
  dms: PropTypes.bool,
  ga: PropTypes.bool,
}

export const defaultProps = {
  dms: true,
  ga: false,
}
