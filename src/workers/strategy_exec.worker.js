import _isFunction from 'lodash/isFunction'
import Indicators from 'bfx-hf-indicators'
import { execOffline } from 'bfx-hf-backtest'
import HFS from 'bfx-hf-strategy'
import HFU from 'bfx-hf-util'
import _ from 'lodash'

const onExecStrategy = ({
  strategyContent, candleData, tradeData, mID, tf,
}) => {
  let strategy = {}
  const sections = Object.keys(strategyContent)
  let sectionContent
  let section

  for (let i = 0; i < sections.length; i += 1) {
    section = sections[i]
    sectionContent = strategyContent[section]

    try {
      if (section.substring(0, 6) === 'define') {
        strategy[section] = eval(sectionContent) // eslint-disable-line
      } else {
        strategy[section] = eval(sectionContent)({ HFS, HFU, _ }) // eslint-disable-line
      }
    } catch (e) {
      postMessage({
        type: 'EXEC_STRATEGY_PARSE_ERROR',
        data: {
          message: `${section}: ${e.message}`,
          section,
        },
      })

      return // return on first error
    }
  }

  strategy = HFS.define({
    ...(_isFunction(strategy.defineMeta) ? strategy.defineMeta() : {}),

    tf,
    symbol: mID,
    exec: strategy.exec,
    indicators: {
      ...(_isFunction(strategy.defineIndicators)
        ? strategy.defineIndicators(Indicators)
        : {}
      ),
    },
  })

  // sort to have oldest first
  candleData.sort((a, b) => b.mts - a.mts)
  tradeData.sort((a, b) => b.mts - a.mts)

  postMessage({ type: 'EXEC_STRATEGY_START' })

  if (tradeData.length <= 0) {
    postMessage({
      type: 'EXEC_STRATEGY_ERROR',
      data: {
        message: 'Insufficient trade data.',
      },
    })
    return
  }

  if (candleData.length <= 0) {
    postMessage({
      type: 'EXEC_STRATEGY_ERROR',
      data: {
        message: 'Insufficient candle data.',
      },
    })
    return
  }

  execOffline(strategy, {
    candles: candleData,
    trades: tradeData,
  }, (currentTick, totalTicks) => {
    if (currentTick % 100 === 0) {
      postMessage({
        type: 'EXEC_STRATEGY_TICK',
        data: {
          currentTick,
          totalTicks,
        },
      })
    }
  }).then((btState = {}) => {
    const { nCandles, nTrades } = btState
    const { trades = [] } = btState.strategy || {}

    postMessage({
      type: 'EXEC_STRATEGY_END',
      data: {
        strategy: { trades },
        nCandles,
        nTrades,
      },
    })
  }).catch((e) => {
    postMessage({
      type: 'EXEC_STRATEGY_ERROR',
      data: {
        message: e.stack,
      },
    })
  })
}

onmessage = (e) => {
  const { data: eventData = {} } = e
  const { type, data = {} } = eventData

  if (type === 'EXEC_STRATEGY') {
    onExecStrategy(data)
  }
}
