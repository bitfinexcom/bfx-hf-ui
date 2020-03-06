import React from 'react'
import MarketSelect from '../../MarketSelect'

const renderMarketDropdown = ({
  onChangeMarket, currentMarket, marketDirty, markets, disabled, // eslint-disable-line
}) => (
  <MarketSelect
    key='market-dropdown'
    disabled={disabled}
    className={{ yellow: marketDirty }}
    onChange={onChangeMarket}
    value={currentMarket}
    markets={markets}
    renderLabel
  />
)

renderMarketDropdown.displayName = 'MarketDropdown'

export default renderMarketDropdown
