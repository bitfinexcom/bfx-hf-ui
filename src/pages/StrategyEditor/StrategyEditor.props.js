import PropTypes from 'prop-types'

export const propTypes = {
  candleData: PropTypes.object,
  activeMarket: PropTypes.object,
  activeExchange: PropTypes.string,
  dark: PropTypes.bool,
}

export const defaultProps = {
  dark: true,
}
