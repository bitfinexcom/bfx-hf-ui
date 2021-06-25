import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getTicker } from '../../../redux/selectors/meta'
import { getActiveMarket } from '../../../redux/selectors/ui'
import PLNumber from '../../../ui/PLNumber'
import { localiseNumber } from '../../../util/ui'

const FIELD_TO_CHANGE = 'price'

const TickerBar = ({ onFieldChange }) => {
  const activeMarket = useSelector(getActiveMarket)
  const activeMarketTicker = useSelector((state) => getTicker(state, activeMarket))

  const { bid, ask } = activeMarketTicker
  const { quote } = activeMarket

  const setInputPrice = (value) => onFieldChange(FIELD_TO_CHANGE, value)
  return (
    <div className='hfui-orderform__ticker-container'>
      <div
        className='ticker-section'
        onClick={() => setInputPrice(bid)}
        role='button'
        tabIndex='0'
      >
        <span className='ticker-name'>BID:</span>
        <PLNumber
          value={bid}
          prepareFunc={localiseNumber}
          ccy={quote}
          isGreen
        />
      </div>
      <div
        className='ticker-section'
        onClick={() => setInputPrice(ask)}
        role='button'
        tabIndex='0'
      >
        <span className='ticker-name'>ASK:</span>
        <PLNumber value={ask} prepareFunc={localiseNumber} ccy={quote} />
      </div>
    </div>
  )
}

TickerBar.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
}

export default memo(TickerBar)
