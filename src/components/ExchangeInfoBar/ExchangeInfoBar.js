import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Ticker, TickerList } from '@ufx-ui/core'

import SwitchMode from '../SwitchMode'

import MarketSelect from '../MarketSelect'
// import RefillIcon from '../../ui/Icons/RefillIcon'
import ExchangeInfoBarItem from './ExchangeInfoBarItem'
import ExchangeInfoBarButton from './ExchangeInfoBar.Button'

import './style.css'

const ExchangeInfoBar = ({
  onChangeMarket,
  activeMarket,
  activeMarketTicker,
  markets,
  openNotifications,
  showTicker,
  allTickersArray,
  favoritePairs,
  subscribeAllMarkets,
  updateFavorites,
  authToken,
  currentMode,
  buttons: Buttons,
  // onRefillClick,
}) => {
  const [showFavorites, setShowingFavorites] = useState(false)

  useEffect(() => {
    subscribeAllMarkets(markets)
  }, [])

  const _updateFavorites = (object) => {
    const arrayWithPairs = Object.keys(object)
    const arrayWithFavorites = arrayWithPairs.filter(pair => object[pair])
    updateFavorites(authToken, arrayWithFavorites, currentMode)
  }

  const {
    low,
    high,
    volume,
    lastPrice,
    dailyChange,
    dailyChangePerc,
  } = activeMarketTicker
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
          data={allTickersArray}
          favs={favoritePairs}
          saveFavs={_updateFavorites}
          showOnlyFavs={showFavorites}
          setShowOnlyFavs={setShowingFavorites}
        />
      </div>
      )}
    </>
  )
}

ExchangeInfoBar.propTypes = {
  activeMarket: PropTypes.object.isRequired, // eslint-disable-line
  onChangeMarket: PropTypes.func.isRequired,
  activeMarketTicker: PropTypes.object.isRequired, // eslint-disable-line
  markets: PropTypes.array, // eslint-disable-line
  showTicker: PropTypes.bool,
  openNotifications: PropTypes.func,
  buttons: PropTypes.func,
  subscribeAllMarkets: PropTypes.func.isRequired,
  allTickersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritePairs: PropTypes.objectOf(PropTypes.bool).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
}

ExchangeInfoBar.defaultProps = {
  markets: [],
  showTicker: true,
  openNotifications: () => { },
  buttons: null,
}

export default ExchangeInfoBar
