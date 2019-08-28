import RES_TO_TF from '../../../util/resolution_to_tf'
import Debug from 'debug'

const debug = Debug('dtc:c:tv-chart:datafeed:sub')

export default (component) => (symbolInfo, resolution, dataCB, subUID, resetCacheCB) => {
  const { markets } = component.props
  const { exchange, name } = symbolInfo
  const exID = exchange.toLowerCase()
  const marketsForExchange = markets[exID] || []
  const market = marketsForExchange.find(m => m.u === name)
  const tf = (RES_TO_TF[exID] || {})[resolution]

  if (!tf || !market) {
    return debug('recv sub for unknown market: %s %s', exID, name)
  }

  const { removeCandlesRequirement, addCandlesRequirement } = component.props

  if (component.candleRequirement) {
    const { exID, market, tf } = component.candleRequirement
    removeCandlesRequirement(exID, market, tf)
  }

  component.candleRequirement = { exID, market, tf }
  component.candleListener = dataCB
  addCandlesRequirement(exID, market, tf)
}
