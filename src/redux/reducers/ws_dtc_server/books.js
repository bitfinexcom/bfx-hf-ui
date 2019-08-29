import Debug from 'debug'
import t from '../../constants/ws_dtc_server'

const debug = Debug('dtc:rx:r:ws-dtc-server:books')
const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_BOOK: {
      const { exID, channel, book = {} } = payload
      const [, market] = channel
      const symbol = market.u
      const [bookType, bookData] = book

      if (bookType !== 'full') {
        debug('recv unsupported book update type: %s', bookType)
        return state
      }

      return {
        ...state,
        [exID]: {
          ...(state[exID] || {}),
          [symbol]: bookData,
        },
      }
    }

    default: {
      return state
    }
  }
}
