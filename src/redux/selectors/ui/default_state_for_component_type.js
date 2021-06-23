import { TIME_FRAMES } from 'bfx-hf-util'
import { createSelector } from 'reselect'
import getActiveMarket from './get_active_market'

const EMPTY_OBJ = {}

const DEFAULT_STATE = {
  orderform: {},
  chart: {
    currentTF: TIME_FRAMES.ONE_MINUTE,
    marketDirty: false,
  },
  book: {
    marketDirty: false,
  },
  trades: {
    marketDirty: false,
  },
}

const getDefaultStateForComponentType = createSelector(
  [
    getActiveMarket,
    (_, type) => type,
  ],
  (activeMarket, type) => {
    switch (type) {
      case 'orderform': {
        return DEFAULT_STATE[type]
      }

      case 'chart':
      case 'book':
      case 'trades': {
        const res = DEFAULT_STATE[type]
        res.currentMarket = activeMarket

        return res
      }

      default: {
        return EMPTY_OBJ
      }
    }
  },
)

export default getDefaultStateForComponentType
