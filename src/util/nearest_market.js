import Levenshtein from 'js-levenshtein'
import _minBy from 'lodash/minBy'

export default (market, markets) => {
  if (markets.length === 0) {
    return market
  }

  const marketsLDistance = markets.map(m => ({
    l: Levenshtein(m.uiID || m.restID, market.uiID || market.restID),
    m,
  }))

  const minLD = _minBy(marketsLDistance, 'l').l
  return marketsLDistance.find(o => o.l === minLD).m
}
