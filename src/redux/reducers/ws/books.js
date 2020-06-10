import Debug from 'debug'
import t from '../../constants/ws'

const debug = Debug('hfui:rx:r:ws-hfui-server:books')
const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_BOOK: {
      const { exID, channel, book = {} } = payload
      const [, market] = channel
      const symbol = market.uiID
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

    case t.PURGE_DATA_BOOK: {
      const { exID, channel } = payload
      const [, market] = channel
      const symbol = market.uiID

      return {
        ...state,
        [exID]: {
          ...(state[exID] || {}),
          [symbol]: [],
        },
      }
    }

    default: {
      return state
    }
  }
}
