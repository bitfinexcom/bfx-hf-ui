import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import MarketSelect from '../../MarketSelect'
import ExchangeInfoBarItem from '../../ExchangeInfoBar/ExchangeInfoBarItem'
import { propTypes, defaultProps } from './forms.props'

const markets = [
  {
    uiID: 'tBTCUSD',
    base: 'BTC',
    quote: 'USD',
  },
  {
    uiID: 'tEHTUSD',
    base: 'ETH',
    quote: 'USD',
  },
  {
    uiID: 'tXRPUSD',
    base: 'XRP',
    quote: 'USD',
  },
]

export default class LiveForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
  }

  render() {
    const {
      updateExecutionType, executionTypes, backtestStrategy, executionType,
    } = this.props
    const {
      selectedMarket,
    } = this.state

    return (
      <div>
        <div className='hfui-backtester__executionform'>
          <div className='hfui-backtester__executiondropdown input-label'>
            <Dropdown
              value={executionType.type}
              onChange={updateExecutionType}
              options={executionTypes.map(et => ({
                label: et.type,
                value: et.type,
              }))}
            />
            <p className='hfui-orderform__input-label'>Execution type</p>
          </div>
          <ExchangeInfoBarItem
            label='Market'
            value={(
              <MarketSelect
                markets={markets}
                value={selectedMarket || markets[0]}
                onChange={v => this.setState({ selectedMarket: v })}
              />
            )}
          />
        </div>
        <Button
          onClick={() => {
            backtestStrategy({
              activeExchange: 'BITFINEX',
              activeMarket: selectedMarket.uID,
            })
          }}
          // disabled={false}
          label='Start'
          green
        />
      </div>
    )
  }
}
