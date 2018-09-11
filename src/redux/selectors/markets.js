import _get from 'lodash/get'

export default function getMarkets (state) {
  return _get(state, 'data.markets', {
    markets: [],
    tfs: [],
  })
}
