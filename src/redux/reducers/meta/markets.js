import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import types from '../../constants/ws'
import marketTypes from '../../constants/market'

const getInitialState = () => {
  return []
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_MARKETS: {
      const { markets = [] } = payload

      return markets
    }

    case marketTypes.SET_CCY_FULL_NAMES: {
      const { names: [namesArr] } = payload
      const newState = _map(state, (market) => {
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

        return newMarketObject
      })
      return newState
    }
    case marketTypes.SET_PERPS_NAMES: {
      const { names: [namesArr] } = payload
      const newState = _map(state, (market) => {
        const perpPair = _find(namesArr, (pair) => {
          const [wsID] = pair
          const combinedPair = `${market.base}:${market.quote}`
          return combinedPair === wsID
        }, null)
        if (!perpPair) {
          return { ...market, isPerp: false }
        }
        const [, perpID] = perpPair

        return { ...market, uiID: perpID, isPerp: true }
      }, state)
      return newState
    }

    default: {
      return state
    }
  }
}
