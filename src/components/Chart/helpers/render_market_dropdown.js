import React from 'react'
import MarketSelect from '../../MarketSelect'

export default ({
  onChangeMarket, currentMarket, marketDirty, markets, disabled,
}) => (
  <MarketSelect
    key='market-dropdown'
    disabled={disabled}
    className={{ yellow: marketDirty }}
    onChange={onChangeMarket}
    value={currentMarket}
    markets={markets}
  />
)
