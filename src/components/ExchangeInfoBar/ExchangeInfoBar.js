import React from 'react'
import PropTypes from 'prop-types'
import { Ticker, TickerList } from '@ufx-ui/core'

import SwitchMode from '../SwitchMode'

import MarketSelect from '../MarketSelect'
// import RefillIcon from '../../ui/Icons/RefillIcon'
import ExchangeInfoBarItem from './ExchangeInfoBarItem'
import ExchangeInfoBarButton from './ExchangeInfoBar.Button'

import './style.css'

class ExchangeInfoBar extends React.PureComponent {
  componentDidMount() {
    const {
      activeMarket, addTickerRequirement, subscribeAllMarkets, markets,
    } = this.props
    addTickerRequirement(activeMarket)
    subscribeAllMarkets(markets)
  }

  toggleTradingMode() {
    const { openTradingModeModal } = this.props
    openTradingModeModal()
  }

  render() {
    const {
      onChangeMarket,
      activeMarket,
      ticker,
      markets,
      openNotifications,
      showTicker,
      buttons: Buttons,
      // onRefillClick,
    } = this.props
    const {
      low,
      high,
      volume,
      lastPrice,
      dailyChange,
      dailyChangePerc,
    } = ticker
    const { base, quote } = activeMarket

    return (
      <>
        <div className='hfui-exchangeinfobar__wrapper'>
          <div className='hfui-exchangeinfobar__left'>
            <ExchangeInfoBarItem
              label='Market'
              className='hfui-exchangeinfobar__currency-selector'
              tag='div'
              value={(
                <MarketSelect
                  markets={markets}
                  value={activeMarket}
                  onChange={(market) => {
                    onChangeMarket(market, activeMarket)
                  }}
                  renderWithFavorites
                />
            )}
            />
          </div>

          <div className='hfui-exchangeinfobar__right'>
            <div className='hfui-exchangeinfobar__buttons'>
              {Buttons && <Buttons />}
              <ExchangeInfoBarButton icon='notifications' onClick={openNotifications} />
            </div>
            <div className='hfui-tradingpaper__control'>
              <div className='hfui-tradingpaper__control-toggle'>
                <p>Paper Trading</p>
                <SwitchMode />
              </div>
              {/* <div className='hfui-tradingpaper__control-refill'>
              <RefillIcon onClick={onRefillClick} />
            </div> */}
            </div>
          </div>
        </div>

        {showTicker && (
          <div className='hfui-exchangeinfobar__wrapper'>
            <Ticker
              data={{
                baseCcy: base,
                quoteCcy: quote,
                lastPrice: lastPrice || '-',
                change: dailyChange || '-',
                changePerc: dailyChangePerc || '-',
                volume: volume || '-',
                low: low || '-',
                high: high || '-',
              }}
            />
            <TickerList
              data={markets}
              favs={{}}
              saveFavs={() => {}}
              showOnlyFavs={false}
              setShowOnlyFavs={() => {}}
            />
            {/* <ul>
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
                dataClassName={
                  dailyChange
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
                dataClassName={
                  dailyChangePerc
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
            </ul> */}
          </div>
        )}
      </>
    )
  }
}

ExchangeInfoBar.propTypes = {
  activeMarket: PropTypes.object.isRequired, // eslint-disable-line
  addTickerRequirement: PropTypes.func.isRequired,
  onChangeMarket: PropTypes.func.isRequired,
  ticker: PropTypes.object.isRequired, // eslint-disable-line
  markets: PropTypes.array, // eslint-disable-line
  showTicker: PropTypes.bool,
  openTradingModeModal: PropTypes.func,
  openNotifications: PropTypes.func,
  buttons: PropTypes.func,
  subscribeAllMarkets: PropTypes.func.isRequired,
}

ExchangeInfoBar.defaultProps = {
  markets: [],
  showTicker: true,
  openTradingModeModal: () => { },
  openNotifications: () => { },
  buttons: null,
}

export default ExchangeInfoBar
