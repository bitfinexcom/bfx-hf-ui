import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import MarketSelect from '../MarketSelect'
import TimeFrameDropdown from '../TimeFrameDropdown'

import './style.css'

const LiveStrategyExecutor = ({
  strategyContent, dsExecuteLiveStrategy, markets,
}) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1m')
  const [selectedMarket, setSelectedMarket] = useState(markets[0])

  if (_isEmpty(strategyContent)) {
    return (
      <div className='hfui-live-stratgey-executor__wrapper'>
        <p>Create a strategy to begin executing.</p>
      </div>
    )
  }

  return (
    <div className='hfui-backtester__executionform hfui-live-stratgey-executor__wrapper'>
      <div className='hfui-backtester_row'>
        <div className='hfui-backtester__flex_start'>
          <MarketSelect
            value={selectedMarket}
            onChange={(selection) => {
              const sel = _find(markets, m => m.uiID === selection.uiID)
              setSelectedMarket(sel)
            }}
            markets={markets}
            renderWithFavorites
          />
        </div>
        <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
          <TimeFrameDropdown tf={selectedTimeFrame} onChange={setSelectedTimeFrame} />
        </div>
        <div>
          <Button
            onClick={dsExecuteLiveStrategy}
            className='hfui-backtester__flex_start hfui-backtester__start-button'
            label='Start'
            green
          />
        </div>
      </div>
      <p>NOTE: By pressing start, you will be executing your strategy on your live account with real balances.</p>
    </div>
  )
}

LiveStrategyExecutor.propTypes = {
  dsExecuteLiveStrategy: PropTypes.func.isRequired,
  strategyContent: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
  ),
  markets: PropTypes.arrayOf(PropTypes.object),
}

LiveStrategyExecutor.defaultProps = {
  strategyContent: {},
  markets: [{}],
}

export default memo(LiveStrategyExecutor)
