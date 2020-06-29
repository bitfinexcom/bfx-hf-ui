import PropTypes from 'prop-types'

export const propTypes = {
  defaultLayoutID: PropTypes.string.isRequired,
  layouts: PropTypes.object.isRequired,
  tradingEnabled: PropTypes.bool,
  darkPanels: PropTypes.bool,
  sharedProps: PropTypes.object,
}

export const defaultProps = {
  tradingEnabled: false,
  darkPanels: false,
  showToolbar: true,
  sharedProps: {},
}
