import React from 'react'
import _capitalize from 'lodash/capitalize'

import Select from '../../ui/Select'
import MarketSelect from '../MarketSelect'
import ExchangeInfoBarItem from './ExchangeInfoBarItem'
import nearestMarket from '../../util/nearest_market'
import quotePrefix from '../../util/quote_prefix'

import { propTypes, defaultProps } from './ExchangeInfoBar.props'
import './style.css'

export default class ExchangeInfoBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidMount() {
    const { activeExchange, activeMarket, addTickerRequirement } = this.props
    addTickerRequirement(activeExchange, activeMarket)
  }

  render() {
    const {
      onChangeMarket, activeMarket, ticker, exchanges = [], activeExchange,
      onChangeExchange, markets, openNotifications, showTicker, showNotifications,
    } = this.props

    const {
      lastPrice, dailyChange, dailyChangePerc, high, low, volume,
    } = ticker

    const marketsForActiveExchange = markets[activeExchange] || []

    return (
      <div className='hfui-exchangeinfobar__wrapper'>
        <div className='hfui-exchangeinfobar__left'>
          <ExchangeInfoBarItem
            label='Exchange'
            value={(
              <Select
                onChange={({ value }) => {
                  const marketsForEx = markets[value] || []
                  const newMarket = nearestMarket(activeMarket, marketsForEx)
                  onChangeExchange(activeExchange, value, activeMarket, newMarket)
                }}

                value={{
                  label: _capitalize(activeExchange),
                  value: activeExchange,
                }}

                options={exchanges.map(ex => ({
                  label: _capitalize(ex),
                  value: ex,
                }))}
              />
            )}
          />

          <ExchangeInfoBarItem
            label='Market'
            value={(
              <MarketSelect
                markets={marketsForActiveExchange}
                value={activeMarket}
                onChange={(market) => {
                  onChangeMarket(activeExchange, market, activeMarket)
                }}
              />
            )}
          />
        </div>
        {(showTicker) && (
          <ul>
            <ExchangeInfoBarItem
              text
              vertical
              label='Last Price'
              value={lastPrice || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change'
              value={dailyChange || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
              dataClassName={dailyChange
                ? dailyChange < 0 ? 'hfui-red' : 'hfui-green'
                : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change %'
              valueSuffix='%'
              value={dailyChangePerc ? dailyChangePerc * 100 : '-'}
              dataClassName={dailyChangePerc
                ? dailyChangePerc < 0 ? 'hfui-red' : 'hfui-green'
                : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h High'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={high || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Low'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={low || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Volume'
              value={volume || '-'}
            />
          </ul>
        )}

        {(showNotifications) && (
          <div className='hfui-exchangeinfobar__right' onClick={openNotifications}>
            <i className='icon-notifications' />
          </div>
        )}
      </div>
    )
  }
}
