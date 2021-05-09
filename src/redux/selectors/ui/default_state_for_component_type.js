import { TIME_FRAMES } from 'bfx-hf-util'
import getActiveMarket from './get_active_market'

export default (state, type) => {
  switch (type) {
    case 'orderform': {
      return {}
    }

    case 'chart': {
      return {
        currentMarket: getActiveMarket(state),
        currentTF: TIME_FRAMES.ONE_MINUTE,
        marketDirty: false,
      }
    }

    case 'trades': {
      return {
        currentMarket: getActiveMarket(state),
        marketDirty: false,
      }
    }

    case 'book': {
      return {
        currentMarket: getActiveMarket(state),
        marketDirty: false,
      }
    }

    default: {
      return {}
    }
  }
}
