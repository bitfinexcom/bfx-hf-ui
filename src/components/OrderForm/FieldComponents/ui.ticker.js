import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { getTicker } from '../../../redux/selectors/meta'
import { getActiveMarket } from '../../../redux/selectors/ui'
import PLNumber from '../../../ui/PLNumber'
import { localiseNumber } from '../../../util/ui'

const TickerBar = () => {
  const activeMarket = useSelector(getActiveMarket)
  const activeMarketTicker = useSelector((state) => getTicker(state, activeMarket))

  const { bid, ask } = activeMarketTicker
  const { quote } = activeMarket
  return (
    <div className='hfui-orderform__ticker-container'>
      <div className='ticker-section'>
        <span>BID:</span>
        <PLNumber value={bid} prepareFunc={localiseNumber} ccy={quote} isGreen />
      </div>
      <div className='ticker-section'>
        <span>ASK:</span>
        <PLNumber value={ask} prepareFunc={localiseNumber} ccy={quote} />
      </div>
    </div>
  )
}

export default memo(TickerBar)
