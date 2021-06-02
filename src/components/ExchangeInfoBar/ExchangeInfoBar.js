import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Ticker, TickerList } from '@ufx-ui/core'

import './style.css'

const ExchangeInfoBar = ({
  onChangeMarket,
  activeMarket,
  activeMarketTicker,
  markets,
  showTicker,
  allTickersArray,
  favoritePairs,
  subscribeAllMarkets,
  updateFavorites,
  authToken,
  currentMode,
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
  const onChangeMarketHandler = (uiID) => {
    const newMarket = markets.find(market => market.uiID === uiID)
    onChangeMarket(newMarket, activeMarket)
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
    <div className='hfui-exchangeinfobar__wrapper'>
      {showTicker && (
        <div className='hfui-exchangeinfobar__left'>
          <Ticker
            data={{
              baseCcy: base,
              quoteCcy: quote,
              lastPrice,
              change: dailyChange,
              changePerc: dailyChangePerc,
              volume,
              low,
              high,
            }}
            className='hfui-exchangeinfobar__ticker'
          />
          <TickerList
            data={allTickersArray}
            favs={favoritePairs}
            saveFavs={_updateFavorites}
            showOnlyFavs={showFavorites}
            setShowOnlyFavs={setShowingFavorites}
            onRowClick={onChangeMarketHandler}
            className='hfui-exchangeinfobar__tickerlist'
          />
        </div>
      )}
    </div>
  )
}

ExchangeInfoBar.propTypes = {
  activeMarket: PropTypes.object.isRequired, // eslint-disable-line
  onChangeMarket: PropTypes.func.isRequired,
  activeMarketTicker: PropTypes.object.isRequired, // eslint-disable-line
  markets: PropTypes.array, // eslint-disable-line
  showTicker: PropTypes.bool,
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
}

export default ExchangeInfoBar
