import React from 'react'

import Button from '../../ui/Button'
import MarketSelect from '../MarketSelect'
import TimeFrameDropdown from '../TimeFrameDropdown'
import { propTypes, defaultProps } from './LiveStrategyExecutor.props'

import './style.css'

export default class LiveStrategyExecutor extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedTimeFrame: '1m',
  }

  render() {
    const {
      strategyContent,
      dsExecuteLiveStrategy,
      markets,
    } = this.props
    const {
      selectedTimeFrame,
      selectedMarket = markets[0],
    } = this.state

    if (!strategyContent) {
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
                const sel = markets.find(m => m.uiID === selection.uiID)
                this.setState(() => ({ selectedMarket: sel }))
              }}
              markets={markets}
              renderWithFavorites
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <TimeFrameDropdown
              tf={selectedTimeFrame}
              onChange={tf => this.setState(() => ({ selectedTimeFrame: tf }))}
            />
          </div>
          <div>
            <Button
              onClick={() => dsExecuteLiveStrategy()}
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
}
