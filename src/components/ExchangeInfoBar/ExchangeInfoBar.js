import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Ticker, TickerList } from '@ufx-ui/core'
import Panel from '../../ui/Panel'

import './style.css'
import { MAIN_MODE } from '../../redux/reducers/ui'

const volumeUnitsList = {
  USD: 'USD',
}

const ExchangeInfoBar = ({
  onChangeMarket,
  activeMarket,
  activeMarketTicker,
  markets,
  allTickersArray,
  favoritePairs,
  updateFavorites,
  authToken,
  currentMode,
  onRemove,
}) => {
  const [showFavorites, setShowingFavorites] = useState(false)

  const _updateFavorites = (object) => {
    const arrayWithPairs = Object.keys(object)
    const arrayWithFavorites = arrayWithPairs.filter(pair => object[pair])
    updateFavorites(authToken, arrayWithFavorites, currentMode)
  }
  const onChangeMarketHandler = ({ rowData: { id } }) => {
    const newMarket = markets.find(market => market.uiID === id)
    if (!newMarket) {
      return
    }
    onChangeMarket(newMarket, activeMarket)
  }

  const {
    low,
    high,
    volume,
    lastPrice,
    change,
    changePerc,
    volumeConverted,
  } = activeMarketTicker
  const { base, quote } = activeMarket

  return (
    <Panel
      key='ticker-symbols'
      label='Ticker symbols'
      onRemove={onRemove}
      darkHeader
      dark
      moveable
      removeable
    >
      <div className='hfui-exchangeinfobar__wrapper'>
        <div className='hfui-exchangeinfobar__left'>
          <Ticker
            data={{
              baseCcy: base,
              quoteCcy: quote,
              lastPrice,
              change,
              changePerc,
              volume: volumeConverted || volume,
              low,
              high,
            }}
            className='hfui-exchangeinfobar__ticker'
            volumeUnit={volumeConverted ? 'USD' : base}
          />
          <TickerList
            data={allTickersArray}
            favs={favoritePairs}
            saveFavs={_updateFavorites}
            showOnlyFavs={showFavorites}
            setShowOnlyFavs={setShowingFavorites}
            onRowClick={onChangeMarketHandler}
            className='hfui-exchangeinfobar__tickerlist'
            volumeUnit='USD'
            volumeUnitList={volumeUnitsList}
            // showing volume in USD only in main mode
            showVolumeUnit={currentMode === MAIN_MODE}
          />
        </div>
      </div>
    </Panel>
  )
}

ExchangeInfoBar.propTypes = {
  activeMarket: PropTypes.shape({
    base: PropTypes.string,
    quote: PropTypes.string,
  }).isRequired,
  onChangeMarket: PropTypes.func.isRequired,
  activeMarketTicker: PropTypes.shape({
    low: PropTypes.number,
    high: PropTypes.number,
    volume: PropTypes.number,
    lastPrice: PropTypes.number,
    change: PropTypes.number,
    changePerc: PropTypes.number,
    volumeConverted: PropTypes.number,
  }).isRequired,
  markets: PropTypes.arrayOf(PropTypes.object),
  allTickersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritePairs: PropTypes.objectOf(PropTypes.bool).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
}

ExchangeInfoBar.defaultProps = {
  markets: [],
  onRemove: () => {},
}

export default ExchangeInfoBar
