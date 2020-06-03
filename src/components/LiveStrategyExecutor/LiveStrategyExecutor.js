
import React from 'react'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import TimeFrameDropdown from '../TimeFrameDropdown'
import { propTypes, defaultProps } from './LiveStrategyExecutor.props'

import './style.css'

const markets = [
  // TODO: get markets from 'availableMarkets'
  {
    uiID: 'tBTCUSD',
    base: 'BTC',
    quote: 'USD',
  },
  {
    uiID: 'tETHUSD',
    base: 'ETH',
    quote: 'USD',
  },
  {
    uiID: 'tXRPUSD',
    base: 'XRP',
    quote: 'USD',
  },
]

// TODO: use global exchangeId or allow user to change
const exId = 'bitfinex'

export default class LiveStrategyExecutor extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedMarket: markets[0],
    selectedTimeFrame: '1m',
  }

  render() {
    const { strategyContent, dsExecuteLiveStrategy } = this.props
    const { selectedTimeFrame, selectedMarket } = this.state

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
            <Dropdown
              value={selectedMarket.uiID}
              onChange={(selection) => {
                const sel = markets.find(m => m.uiID === selection)
                this.setState({ selectedMarket: sel })
              }}
              options={markets.map(m => ({
                label: m.uiID,
                value: m.uiID,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start' style={{ marginRight: -15 }}>
            <TimeFrameDropdown
              exID={exId}
              tf={selectedTimeFrame}
              onChange={tf => this.setState({ selectedTimeFrame: tf })}
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
