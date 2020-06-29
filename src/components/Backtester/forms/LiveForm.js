import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

export default class HistoricalForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {}

  executeBacktest = () => {
  }

  render() {
    const {
      updateExecutionType,
      executionTypes,
      executionType,
      disabled = false,
      allMarkets,
      exId,
    } = this.props
    const {
      selectedMarket = allMarkets[exId][0],
    } = this.state

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
                const sel = allMarkets[exId].find(m => m.uiID === selection)
                this.setState(() => ({ selectedMarket: sel }))
              }}
              options={allMarkets[exId].map(m => ({
                label: m.uiID,
                value: m.uiID,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <div>
              <Button
                onClick={this.executeBacktest}
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
}
