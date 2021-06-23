import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _find from 'lodash/find'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'

const HistoricalForm = ({
  updateExecutionType, executionTypes, executionType, disabled, markets,
}) => {
  const [selectedMarket, setSelectedMarket] = useState(markets[0])
  const executeBacktest = () => { }

  return (
    <div className='hfui-backtester__executionform'>
      <div className='hfui-backtester_row'>
        <div className='hfui-backtester__flex_start'>
          <Dropdown
            value={executionType.type}
            onChange={updateExecutionType}
            options={executionTypes.map(et => ({
              label: et.type,
              value: et.type,
            }))}
          />
        </div>
        <div className='hfui-backtester__flex_start'>
          <Dropdown
            value={selectedMarket.uiID}
            onChange={(selection) => {
              const sel = _find(markets, m => m.uiID === selection.uiID)
              setSelectedMarket(sel)
            }}
            options={_map(markets, m => ({
              label: m.uiID,
              value: m.uiID,
            }))}
          />
        </div>
        <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
          <div>
            <Button
              onClick={executeBacktest}
              className='hfui-backtester__flex_start hfui-backtester__start-button'
              disabled={disabled}
              label='Start'
              green
            />
          </div>
        </div>
      </div>
    </div>
  )
}

HistoricalForm.propTypes = {
  updateExecutionType: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  executionTypes: PropTypes.arrayOf(PropTypes.object),
  markets: PropTypes.arrayOf(PropTypes.object),
  executionType: PropTypes.string,
}

HistoricalForm.defaultProps = {
  markets: [{}],
  disabled: false,
  executionType: '',
  executionTypes: [],
}

export default memo(HistoricalForm)
