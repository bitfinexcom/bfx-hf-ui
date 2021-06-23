import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TickerList, Ticker } from '@ufx-ui/core'

import Panel from '../../ui/Panel'
import useSize from '../../hooks/useSize'
import { tickerDataMapping, rowMapping } from './ExchangeInforBar.constants'

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
  const [tickerRef, size] = useSize()

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
  const {
    base, quote, uiID, isPerp,
  } = activeMarket

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
        <div ref={tickerRef} className='hfui-exchangeinfobar__ticker-wrapper'>
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
              isPerp,
              perpUI: isPerp ? uiID : null,
            }}
            dataMapping={tickerDataMapping}
            className='hfui-exchangeinfobar__ticker'
            volumeUnit={volumeConverted ? 'USD' : base}
          />
        </div>
        <div
          className='hfui-exchangeinfobar__tickerlist-wrapper'
          style={size.height ? { height: `calc(100% - ${size.height}px)` } : undefined}
        >
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
            rowMapping={rowMapping}
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
    uiID: PropTypes.string,
    isPerp: PropTypes.bool,
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
