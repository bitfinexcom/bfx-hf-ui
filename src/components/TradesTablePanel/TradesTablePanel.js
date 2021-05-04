/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _filter from 'lodash/filter'
import _size from 'lodash/size'
import { Trades } from '@ufx-ui/core'
import {
  reduxActions,
  reduxSelectors,
  reduxConstants,
  useCommonBfxData,
} from '@ufx-ui/bfx-containers'

import MarketSelect from '../MarketSelect'
import Panel from '../../ui/Panel'
import './style.css'

const { trades } = reduxConstants
const { SUBSCRIPTION_CONFIG } = trades
const { WSSubscribeChannel, WSUnsubscribeChannel } = reduxActions
const { getRecentTrades, hasFetchedTrades: hasFetchedTradesSelector } = reduxSelectors

const TradesTablePanel = (props) => {
  const {
    dark,
    layoutI,
    onRemove,
    moveable,
    layoutID,
    showMarket,
    removeable,
    savedState,
    allMarkets,
    updateState,
    activeMarket,
    activeExchange,
    canChangeMarket,
    allMarketTrades,
  } = props
  const {
    currentMarket = activeMarket,
    currentExchange = activeExchange,
  } = savedState
  const { base, quote } = currentMarket

  const { symbol, dispatch, isWSConnected } = useCommonBfxData(base, quote)
  const marketData = useSelector(state => getRecentTrades(state, symbol))
  const hasFetchedTrades = useSelector(state => hasFetchedTradesSelector(state, symbol))

  useEffect(() => {
    if (isWSConnected && symbol) {
      dispatch(WSSubscribeChannel({
        ...SUBSCRIPTION_CONFIG,
        symbol,
      }))
    }
  }, [isWSConnected, symbol, dispatch])

  const unSubscribeWSChannel = (s) => {
    const tradesUsingSymbol = _filter(allMarketTrades, ({ currentMarket: cm }) => cm.wsID === s)

    if (_size(tradesUsingSymbol) > 1) {
      return
    }

    dispatch(WSUnsubscribeChannel({
      ...SUBSCRIPTION_CONFIG,
      symbol: s,
    }))
  }

  const saveState = (param, value) => {
    updateState(layoutID, layoutI, {
      [param]: value,
    })
  }

  const onChangeMarket = (market) => {
    if (market.restID === currentMarket.restID) {
      return
    }

    const { wsID } = currentMarket
    unSubscribeWSChannel(wsID)

    saveState('currentMarket', market)
  }

  const renderMarketDropdown = () => {
    const markets = allMarkets[currentExchange] || []
    return (
      <MarketSelect
        markets={markets}
        renderWithFavorites
        key='market-dropdown'
        value={currentMarket}
        onChange={onChangeMarket}
        disabled={!canChangeMarket}
      />
    )
  }

  const handleOnRemove = (...args) => {
    unSubscribeWSChannel(symbol)
    onRemove(...args)
  }

  return (
    <Panel
      dark={dark}
      label='TRADES'
      darkHeader={dark}
      moveable={moveable}
      onRemove={handleOnRemove}
      removeable={removeable}
      className='hfui-tradestable__wrapper'
      secondaryHeaderComponents={[
        showMarket && renderMarketDropdown(),
      ]}
    >
      <Trades
        market={marketData}
        online={isWSConnected}
        loading={!hasFetchedTrades}
      />
    </Panel>
  )
}

TradesTablePanel.propTypes = {
  dark: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  showMarket: PropTypes.bool,
  savedState: PropTypes.object,
  canChangeMarket: PropTypes.bool,
  allMarketTrades: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  layoutI: PropTypes.string.isRequired,
  layoutID: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  allMarkets: PropTypes.object.isRequired,
  activeMarket: PropTypes.object.isRequired,
  activeExchange: PropTypes.string.isRequired,
}

TradesTablePanel.defaultProps = {
  dark: false,
  savedState: {},
  moveable: true,
  removeable: true,
  showMarket: false,
  allMarketTrades: [],
  canChangeMarket: true,
}

export default memo(TradesTablePanel)
