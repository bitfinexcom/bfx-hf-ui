import PropTypes from 'prop-types'

export const propTypes = {
  layouts: PropTypes.object,
  tradingEnabled: PropTypes.bool,
}

export const defaultProps = {
  layouts: {},
  tradingEnabled: false,
}
