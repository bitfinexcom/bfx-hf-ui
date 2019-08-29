import _isArray from 'lodash/isArray'
import Debug from 'debug'

import WSDTCActions from '../../actions/ws_dtc_server'
import BFXDataActions from '../../actions/bfx_data'

const debug = Debug('dtc:rx:m:ws-dtc-server:msg')

export default (ws, store) => (e = {}) => {
  const { data = '' } = e
  let payload

  try {
    payload = JSON.parse(data)
  } catch (error) {
    console.error('[wss] error parsing JSON: ', error.message)
    return
  }

  if (!_isArray(payload)) {
    console.error('[wss] recv invalid ws payload: ', payload)
    return
  }

  const [type] = payload

  switch (type) {
    case 'info.version': {
      debug('API version %s', payload[1])
      break
    }

    case 'info.exchanges': {
      store.dispatch(WSDTCActions.recvDataExchanges(payload[1]))
      break
    }

    case 'info.markets': {
      const [, ecxhangeID, markets] = payload
      store.dispatch(WSDTCActions.recvDataMarkets(ecxhangeID, markets))
      break
    }

    case 'subscribed': {
      const [, exID, chanID, chanData] = payload
      store.dispatch(WSDTCActions.subscribed({ exID, chanID, chanData }))
      break
    }

    case 'data': {
      const [, exID, chanID, exData] = payload
      store.dispatch(WSDTCActions.bufferDataFromExchange(exID, chanID, exData))
      break
    }

    case 'data.candles': {
      const [, exID, symbol, tf, start, end, candles] = payload
      store.dispatch(WSDTCActions.recvDataCandles({
        exID, symbol, tf, candles, start, end,
      }))
      break
    }

    case 'data.sync.start': {
      const [, exID, symbol, tf, start, end] = payload
      store.dispatch(WSDTCActions.recvDataSyncStart({
        exID, symbol, tf, start, end,
      }))
      break
    }

    case 'data.sync.end': {
      const [, exID, symbol, tf, start, end] = payload
      store.dispatch(WSDTCActions.recvDataSyncEnd({
        exID, symbol, tf, start, end,
      }))
      break
    }

    case 'data.strategies': {
      const [, strategies] = payload
      store.dispatch(WSDTCActions.recvStrategies({ strategies }))
      break
    }

    case 'data.strategy': {
      const [, id, strategy] = payload
      store.dispatch(WSDTCActions.recvStrategy({ id, strategy }))
      break
    }

    case 'error': {
      const [, message] = payload
      store.dispatch(BFXDataActions.notification({
        status: 'error',
        text: message,
        mts: Date.now(),
      }))
      break
    }

    case 'notify': {
      const [, status, message] = payload
      store.dispatch(BFXDataActions.notification({
        status,
        text: message,
        mts: Date.now(),
      }))
      break
    }

    case 'authenticated': {
      const [,
        userID, username, userEmail, authToken, apiKeys, subscription,
        cancelSubscriptionURL, updateBillingURL,
      ] = payload

      store.dispatch(WSDTCActions.authSuccess({
        userID,
        username,
        userEmail,
        authToken,
        apiKeys,
        subscription,
        cancelSubscriptionURL,
        updateBillingURL,
      }))
      break
    }

    case 'data.api_credentials': {
      const [, exID, apiKey, apiSecret] = payload
      store.dispatch(WSDTCActions.recvAPICredentials({
        exID, apiKey, apiSecret,
      }))
      break
    }

    case 'data.client': {
      const [, exID, status] = payload
      store.dispatch(WSDTCActions.recvClientStatusUpdate({ exID, status }))
      break
    }

    case 'data.positions': {
      const [, exID, positions] = payload
      store.dispatch(WSDTCActions.recvPositions({ exID, positions }))
      break
    }

    case 'data.position': {
      const [, exID, position] = payload
      store.dispatch(WSDTCActions.recvPosition({ exID, position }))
      break
    }

    case 'data.position.close': {
      const [, exID, position] = payload
      store.dispatch(WSDTCActions.recvPositionClose({ exID, position }))
      break
    }

    case 'data.balances': {
      const [, exID, balances] = payload
      store.dispatch(WSDTCActions.recvBalances({ exID, balances }))
      break
    }

    case 'data.balance': {
      const [, exID, balance] = payload
      store.dispatch(WSDTCActions.recvBalance({ exID, balance }))
      break
    }

    case 'data.orders': {
      const [, exID, orders] = payload
      store.dispatch(WSDTCActions.recvOrders({ exID, orders }))
      break
    }

    case 'data.order': {
      const [, exID, order] = payload
      store.dispatch(WSDTCActions.recvOrder({ exID, order }))
      break
    }

    case 'data.order.close': {
      const [, exID, order] = payload
      store.dispatch(WSDTCActions.recvOrderClose({ exID, order }))
      break
    }

    case 'data.aos': {
      const [, exID, aos] = payload
      store.dispatch(WSDTCActions.recvDataAlgoOrders({ exID, aos }))
      break
    }

    case 'data.ao': {
      const [, exID, ao] = payload
      store.dispatch(WSDTCActions.recvDataAlgoOrder({ exID, ao }))
      break
    }

    case 'data.ao.stopped': {
      const [, exID, gid] = payload
      store.dispatch(WSDTCActions.recvDataAlgoOrderStopped({ exID, gid }))
      break
    }

    case 'data.indicator_values': {
      const [, exID, tf, results] = payload
      store.dispatch(WSDTCActions.recvIndicatorValues({ exID, tf, results }))
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
