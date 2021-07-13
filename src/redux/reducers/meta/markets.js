import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _reduce from 'lodash/reduce'
import types from '../../constants/ws'
import marketTypes from '../../constants/market'

const EMPTY_OBJ = {}

const getInitialState = () => {
  return EMPTY_OBJ
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_MARKETS: {
      const { markets = EMPTY_OBJ } = payload

      return _reduce(markets, (acc, market) => {
        acc[market.wsID] = market
        return acc
      }, EMPTY_OBJ)
    }

    case marketTypes.SET_CCY_FULL_NAMES: {
      const { names: [namesArr] } = payload
      const marketsKeysArray = Object.keys(state)

      const newState = _reduce(marketsKeysArray, (acc, key) => {
        const market = state[key]
        const {
          quote, base, uiID,
        } = market
        const defaultArray = [quote, base, uiID]
        const fullNamesArray = _filter(namesArr, (pair) => {
          const [shortName] = pair
          return shortName === quote || shortName === base
        }, defaultArray)

        let labels = []
        if (fullNamesArray.length === 0) {
          labels = [...defaultArray]
        }
        if (fullNamesArray.length === 1) {
          const fullName = fullNamesArray[0][1]
          labels = [...defaultArray, fullName]
        }
        if (fullNamesArray.length === 2) {
          const [firstPair, secondPair] = fullNamesArray
          labels = [...firstPair, ...secondPair]
        }

        // eslint-disable-next-line no-param-reassign
        const newMarketObject = {
          ...market,
          ccyLabels: labels,
        }

        acc[key] = newMarketObject

        return acc
      }, EMPTY_OBJ)
      return newState
    }
    case marketTypes.SET_PERPS_NAMES: {
      const { names: [namesArr] } = payload
      const marketsKeysArray = Object.keys(state)

      const newState = _reduce(marketsKeysArray, (acc, key) => {
        const market = state[key]
        const perpPair = _find(namesArr, (pair) => {
          const [wsID] = pair
          const combinedPair = `${market.base}:${market.quote}`
          return combinedPair === wsID
        }, null)
        if (!perpPair) {
          acc[key] = { ...market, isPerp: false }
        } else {
          const [, perpID] = perpPair

          acc[key] = { ...market, uiID: perpID, isPerp: true }
        }
        return acc
      }, EMPTY_OBJ)
      return newState
    }

    default: {
      return state
    }
  }
}
