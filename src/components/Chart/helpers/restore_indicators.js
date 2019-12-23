import Indicators from 'bfx-hf-indicators'
import { nonce } from 'bfx-api-node-util'
import RandomColor from 'randomcolor'

import calcIndicatorValuesForCandles from './calc_indicator_values_for_candles'

export default (indicatorIDs = [], indicatorArgs = [], candles = []) => {
  const indicators = []
  const indicatorData = {}

  console.log({ indicatorIDs, indicatorArgs })

  indicatorIDs.forEach((id, n) => {
    const I = Object.values(Indicators).find(i => i.id === id)
    const i = new I((I).args.map((arg, argN) => (indicatorArgs[n] || {})[argN] || arg.default))

    // Copy metadata
    i.id = I.id
    i.ui = I.ui
    i.key = `${I.id}-${nonce()}`
    i.args = I.args.map(arg => arg.default)
    i.color = RandomColor({ luminosity: 'bright' })

    indicators.push(i)
    indicatorData[i.key] = calcIndicatorValuesForCandles(i, candles)
  })

  return { indicators, indicatorData }
}
