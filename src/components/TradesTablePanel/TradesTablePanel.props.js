import PropTypes from 'prop-types'

import i18n from './i18n.json'

const dictionary = i18n['ru-RU']

export const propTypes = {
  label: PropTypes.string,
  layoutID: PropTypes.string.isRequired,
  layoutI: PropTypes.string.isRequired,
  activeExchange: PropTypes.string.isRequired,
  activeMarket: PropTypes.object.isRequired,
  allMarkets: PropTypes.object.isRequired,
  exchanges: PropTypes.array.isRequired,
  savedState: PropTypes.object.isRequired,
  saveState: PropTypes.func.isRequired,
  addTradesRequirement: PropTypes.func.isRequired,
  removeTradesRequirement: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  canChangeExchange: PropTypes.bool,
  canChangeMarket: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  showExchange: PropTypes.bool,
  showMarket: PropTypes.bool,
  dark: PropTypes.bool,
}

export const defaultProps = {
  label: dictionary.trades,
  canChangeExchange: true,
  canChangeMarket: true,
  dark: false,
}
