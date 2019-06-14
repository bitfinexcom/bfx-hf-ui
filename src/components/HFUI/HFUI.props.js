import PropTypes from 'prop-types'

export const propTypes = {
  loadInitialSettings: PropTypes.func,
  loadAPIKey: PropTypes.func,
  cycleBFXConnection: PropTypes.func,
}

export const defaultProps = {
  loadInitialSettings: () => {},
  strategies: () => {},
  cycleBFXConnection: () => {},
}
