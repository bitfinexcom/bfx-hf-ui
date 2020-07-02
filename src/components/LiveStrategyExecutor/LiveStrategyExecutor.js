import React from 'react'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import TimeFrameDropdown from '../TimeFrameDropdown'
import { propTypes, defaultProps } from './LiveStrategyExecutor.props'

import './style.css'

// TODO: use global exchangeId or allow user to change
const exId = 'bitfinex'

export default class LiveStrategyExecutor extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedTimeFrame: '1m',
  }

  onExecuteStrategy = () => {
    const {
      strategy, dsExecuteLiveStrategy, authToken, allMarkets,
    } = this.props

    const {
      selectedTimeFrame: tf, selectedMarket = allMarkets[exId][0],
    } = this.state

    // TODO: Optionally refactor to pass full market object. Not needed if
    // only Bitfinex environment.
    const { wsID } = selectedMarket
    const { id: strategyID } = strategy

    dsExecuteLiveStrategy({
      authToken, strategyID, tf, wsID,
    })
  }

  render() {
    const { strategyContent, allMarkets } = this.props
    const {
      selectedTimeFrame,
      selectedMarket = allMarkets[exId][0],
    } = this.state

    const markets = allMarkets[exId]

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
                this.setState(() => ({ selectedMarket: sel }))
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
              onChange={tf => this.setState(() => ({ selectedTimeFrame: tf }))}
            />
          </div>
          <div>
            <Button
              onClick={this.onExecuteStrategy}
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
