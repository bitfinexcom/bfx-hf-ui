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
      showAddComponent, onAddComponent, showSave, onSave,
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
              label='Last'
              value={lastPrice || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
            />

            <ExchangeInfoBarItem
              text
              label='24h Δ'
              value={dailyChange || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
              dataClassName={
                dailyChange
                  ? dailyChange < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              label='24h Δ %'
              valueSuffix='%'
              value={dailyChangePerc
                ? (dailyChangePerc * 100).toFixed(2)
                : '-'}

              dataClassName={
                dailyChangePerc
                  ? dailyChangePerc < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              label='24h H'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={high || '-'}
            />

            <ExchangeInfoBarItem
              text
              label='24h L'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={low || '-'}
            />

            <ExchangeInfoBarItem
              text
              label='24h Vol'
              value={volume || '-'}
            />
          </ul>
        )}

        {(showSave) && (
          <div className='hfui-exchangeinfobar__right' onClick={onSave}>
            <i className='icon-save' />
          </div>
        )}

        {(showAddComponent) && (
          <div className='hfui-exchangeinfobar__right' onClick={onAddComponent}>
            <i className='icon-plus' />
          </div>
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
