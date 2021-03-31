import PropTypes from 'prop-types'

export const propTypes = {
  allMarkets: PropTypes.object,
  savedState: PropTypes.object.isRequired,
  canChangeMarket: PropTypes.bool,
  dark: PropTypes.bool,
}

export const defaultProps = {
  dark: false,
}
