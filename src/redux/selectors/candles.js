import _get from 'lodash/get'

export default function getCandles (state, symbol, tf, type) {
  return _get(state, `dataHF.candles.${symbol}:${type}:${tf}`, {})
}
