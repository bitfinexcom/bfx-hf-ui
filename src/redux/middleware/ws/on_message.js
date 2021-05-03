import _isArray from 'lodash/isArray'
import _isObject from 'lodash/isObject'
import _isNumber from 'lodash/isNumber'
import Debug from 'debug'

import UIActions from '../../actions/ui'
import WSActions from '../../actions/ws'
import AOActions from '../../actions/ao'

const debug = Debug('hfui:rx:m:ws-hfui-server:msg')

export default (alias, store) => (e = {}) => {
  const { data = '' } = e
  let payload

  try {
    payload = JSON.parse(data)
  } catch (error) {
    console.error('[wss] error parsing JSON: ', error.message)
    return
  }

  if (!_isObject(payload)) {
    console.error('[wss] recv invalid ws payload: ', payload)
    return
  }
  const event = payload?.event
  const hasDataUpdates = _isNumber(payload[0]) && _isArray(payload[1])

  if (event === 'subscribed') {
    const { chanId: chanID, channel: chanName } = payload
    store.dispatch(WSActions.pubSubscribed({ chanID, chanName }))
  }

  if (hasDataUpdates) {
    const exID = 'bitfinex'
    const chanID = payload[0]
    const exData = payload[1]
    store.dispatch(WSActions.bufferDataFromExchange(exID, chanID, null, exData))
  }

  if (_isArray(payload)) {
    const [type] = payload
    switch (type) {
      case 'info.version': {
        debug('API version %s', payload[1])
        break
      }

      case 'info.exchanges': {
        store.dispatch(WSActions.recvDataExchanges(payload[1]))
        break
      }

      case 'info.markets': {
        const [, ecxhangeID, markets] = payload
        store.dispatch(WSActions.recvDataMarkets(ecxhangeID, markets))
        break
      }

      case 'info.auth_configured': {
        const [, configured] = payload
        store.dispatch(WSActions.recvAuthConfigured(configured))
        break
      }

      case 'info.auth_token': {
        const [, token] = payload
        store.dispatch(WSActions.recvAuthToken(token))
        store.dispatch(AOActions.getActiveAlgoOrders())
        break
      }

      case 'subscribed': {
        const [, exID, chanID, chanData] = payload
        store.dispatch(WSActions.subscribed({ exID, chanID, chanData }))
        break
      }

      case 'data': {
        const [, exID, chanID, exData] = payload
        store.dispatch(WSActions.bufferDataFromExchange(exID, chanID, exData))
        break
      }

      case 'data.sync.start': {
        const [, exID, symbol, tf, start, end] = payload
        store.dispatch(WSActions.recvDataSyncStart({
          exID, symbol, tf, start, end,
        }))
        break
      }

      case 'data.sync.end': {
        const [, exID, symbol, tf, start, end] = payload
        store.dispatch(WSActions.recvDataSyncEnd({
          exID, symbol, tf, start, end,
        }))
        break
      }

      case 'data.strategies': {
        const [, strategies] = payload
        store.dispatch(WSActions.recvStrategies({ strategies }))
        break
      }

      case 'data.strategy': {
        const [, id, strategy] = payload
        store.dispatch(WSActions.recvStrategy({ id, strategy }))
        break
      }

      case 'data.strategy.removed': {
        const [, id] = payload
        store.dispatch(WSActions.recvRemovedStrategy(id))
        break
      }
      case 'data.favourite_trading_pairs.saved': {
        const [, pairs] = payload
        store.dispatch(WSActions.recvUpdatedFavoritePairs(pairs))
        break
      }
      case 'error': {
        const [, message] = payload
        store.dispatch(UIActions.setIsOrderExecuting(false))
        store.dispatch(WSActions.recvNotification({
          status: 'error',
          text: message,
          mts: Date.now(),
        }))
        break
      }

      case 'notify': {
        const [, status, message] = payload
        store.dispatch(UIActions.setIsOrderExecuting(false))
        store.dispatch(WSActions.recvNotification({
          status,
          text: message,
          mts: Date.now(),
        }))
        break
      }

      case 'data.api_credentials.configured': {
        const [, exID] = payload
        store.dispatch(WSActions.recvAPICredentialsConfigured({ exID }))
        break
      }

      case 'data.settings.updated': {
        const [, settings] = payload
        store.dispatch(WSActions.recvUpdatedSettings(settings))
        break
      }

      case 'data.client': {
        const [, exID, status] = payload
        store.dispatch(WSActions.recvClientStatusUpdate({ exID, status }))
        break
      }

      case 'data.positions': {
        const [, exID, positions] = payload
        store.dispatch(WSActions.recvPositions({ exID, positions }))
        break
      }

      case 'data.position': {
        const [, exID, position] = payload
        store.dispatch(WSActions.recvPosition({ exID, position }))
        break
      }

      case 'data.position.close': {
        const [, exID, position] = payload
        store.dispatch(WSActions.recvPositionClose({ exID, position }))
        break
      }

      case 'data.balances': {
        const [, exID, balances] = payload
        store.dispatch(WSActions.recvBalances({ exID, balances }))
        break
      }

      case 'data.balance': {
        const [, exID, balance] = payload
        store.dispatch(WSActions.recvBalance({ exID, balance }))
        break
      }

      case 'data.orders': {
        const [, exID, orders] = payload
        store.dispatch(WSActions.recvOrders({ exID, orders }))
        break
      }

      case 'data.order': {
        const [, exID, order] = payload
        store.dispatch(WSActions.recvOrder({ exID, order }))
        break
      }

      case 'data.order.close': {
        const [, exID, order] = payload
        store.dispatch(WSActions.recvOrderClose({ exID, order }))
        break
      }

      case 'data.aos': {
        const [, exID, aos] = payload
        store.dispatch(WSActions.recvDataAlgoOrders({ exID, aos }))
        break
      }

      case 'data.ao': {
        const [, exID, ao] = payload
        store.dispatch(WSActions.recvDataAlgoOrder({ exID, ao }))
        break
      }

      case 'data.ao.stopped': {
        const [, exID, gid] = payload
        store.dispatch(WSActions.recvDataAlgoOrderStopped({ exID, gid }))
        break
      }

      case 'bt.exec': {
        const [, from, to, symbol, tf, withCandles, withTrades, syncData] = payload
        store.dispatch(WSActions.recvBacktestExecute({
          from,
          to,
          symbol,
          tf,
          withCandles,
          withTrades,
          syncData,
        }))
        break
      }

      case 'bt.start': {
        const [,,, from, to] = payload
        store.dispatch(WSActions.recvBacktestStart({ from, to }))
        break
      }

      case 'bt.candle': {
        const [,,, candle] = payload
        store.dispatch(WSActions.recvBacktestCandle(candle))
        break
      }

      case 'bt.trade': {
        const [,,, trade] = payload
        store.dispatch(WSActions.recvBacktestTrade(trade))
        break
      }

      case 'bt.end': {
        const [,,, from, to] = payload
        store.dispatch(WSActions.recvBacktestEnd({ from, to }))
        break
      }

      case 'bt.btresult': {
        const [, res] = payload
        store.dispatch(WSActions.recvBacktestResults(res))
        break
      }

      case 'algo.active_orders': {
        const [, activeAlgoOrders] = payload
        store.dispatch(AOActions.setActiveAlgoOrders(activeAlgoOrders))
        store.dispatch(AOActions.showActiveOrdersModal(true))
        break
      }

      case 'algo.reload': {
        store.dispatch(WSActions.clearAlgoOrders())
        store.dispatch(UIActions.setFilteredValueWithKey('filteredAO', []))
        store.dispatch(AOActions.getActiveAlgoOrders())
        break
      }

      case 'refresh': {
        window.location.reload()
        break
      }

      default: {
        break
      }
    }
  }
}
