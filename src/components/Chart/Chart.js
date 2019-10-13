import React from 'react'
import ClassNames from 'classnames'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import RandomColor from 'randomcolor'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { TIME_FRAME_WIDTHS } from 'bfx-hf-util'
import { nonce } from 'bfx-api-node-util'
import Indicators from 'bfx-hf-indicators'
import { AutoSizer } from 'react-virtualized'
import { ChartCanvas, Chart as RSChart } from 'react-stockcharts/'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'

import {
  BarSeries, CandlestickSeries, LineSeries, BollingerSeries,
} from 'react-stockcharts/lib/series'

import {
  CrossHairCursor, MouseCoordinateX, MouseCoordinateY, PriceCoordinate,
} from 'react-stockcharts/lib/coordinates'

import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip'

import BuyOrderAnnotation from './BuyOrderAnnotation'
import SellOrderAnnotation from './SellOrderAnnotation'
import EventAnnotation from './EventAnnotation'
import IndicatorSettingsModal from './IndicatorSettingsModal'
import SettingsTextOverlay from './SettingsTextOverlay'

import Panel from '../../ui/Panel'
import Spinner from '../../ui/Spinner'

import {
  genChartData,
  restoreIndicators,
  defaultRangeForTF,
  renderMarketDropdown,
  renderExchangeDropdown,
  renderTimeFrameDropdown,
  renderExternalIndicators,
  renderAddIndicatorDropdown,
  renderRemoveIndicatorDropdown,
  calcIndicatorValuesForCandles,
  getDerivedStateFromProps,
} from './helpers'

import { getSyncRanges, getLastCandleUpdate } from '../../redux/selectors/ws'
import { getMarketsForExchange } from '../../redux/selectors/meta'
import nearestMarket from '../../util/nearest_market'

import { propTypes, defaultProps } from './Chart.props'
import './style.css'

const DEFAULT_ZOOM_CANDLE_COUNT = 100
const HEIGHT_STEP_PX = 20
const MIN_HEIGHT_PX = 250

// TODO: Extract into open source component
class Chart extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static getDerivedStateFromProps = getDerivedStateFromProps

  state = {
    candles: [],
    lastCandleUpdate: null,
    lastInternalCandleUpdate: 0,
    marketDirty: false, // if false, we update w/ saved state
    exchangeDirty: false,

    focus: null,
    prevFocusMTS: null,
    lastDomain: null,

    indicators: [],
    indicatorData: {},

    settingsModalOpen: false,
    settingsModalProps: {},
    settingsModalType: null,
  }

  constructor(props) {
    super(props)

    const {
      savedState = {}, candleData = {}, reduxState, defaultHeight = 350,
      activeMarket,
    } = props

    const {
      currentExchange, currentMarket = activeMarket, currentTF = '1m', marketDirty, exchangeDirty,
      indicatorIDs = props.indicatorIDs, indicatorArgs = props.indicatorArgs,
      height = defaultHeight,
    } = savedState

    // NOTE: We don't restore the saved range, as it can be very large depending
    //       on the previous user pans
    const currentRange = defaultRangeForTF(currentTF)
    const start = currentRange[0]
    const candleKey = `${currentTF}:${currentMarket.uiID}`
    const allCandles = Object.values((candleData[currentExchange] || {})[candleKey] || {})
    const candles = allCandles.filter(({ mts }) => mts >= start)

    this.state = {
      ...this.state,

      currentExchange,
      currentMarket,
      currentRange,
      currentTF,
      height,

      marketDirty,
      exchangeDirty,

      lastCandleUpdate: getLastCandleUpdate(reduxState, {
        exID: currentExchange,
        symbol: currentMarket.restID,
        tf: currentTF,
      }),

      ...restoreIndicators(indicatorIDs, indicatorArgs, candles),
      ...genChartData(candles),
    }

    const { onRangeChange, onTFChange } = props

    if (onRangeChange) {
      onRangeChange(currentRange)
    }

    if (onTFChange) {
      onTFChange(currentTF)
    }

    this.onChangeTF = this.onChangeTF.bind(this)
    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onChangeExchange = this.onChangeExchange.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
    this.onChartEvent = this.onChartEvent.bind(this)
    this.onAddIndicator = this.onAddIndicator.bind(this)
    this.onRemoveIndicator = this.onRemoveIndicator.bind(this)
    this.onOpenSettingsModal = this.onOpenSettingsModal.bind(this)
    this.onCloseSettingsModal = this.onCloseSettingsModal.bind(this)
    this.onSaveSettingsModalSettings = this.onSaveSettingsModalSettings.bind(this)
    this.onIncreaseHeight = this.onIncreaseHeight.bind(this)
    this.onDecreaseHeight = this.onDecreaseHeight.bind(this)
    this.chartRef = null
  }

  componentDidMount() {
    const { addCandlesRequirement, addTradesRequirement } = this.props
    const { currentExchange, currentMarket, currentTF } = this.state

    this.syncData()
    addCandlesRequirement(currentExchange, currentMarket, currentTF)
    addTradesRequirement(currentExchange, currentMarket)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      indicators, indicatorData, trades, focusMTS, positions, exchanges, orders,
    } = this.props

    const {
      currentTF, currentExchange, currentMarket, indicators: stateIndicators,
      settingsModalOpen, height, lastDomain, lastInternalCandleUpdate,
    } = this.state

    if (
      !_isEqual(nextProps.indicators, indicators)
      || !_isEqual(nextProps.indicatorData, indicatorData)
      || !_isEqual(nextProps.trades, trades)
      || (nextProps.focusMTS !== focusMTS)
      || (nextState.currentTF !== currentTF)
      || (nextState.currentExchange !== currentExchange)
      || !_isEqual(nextState.currentMarket, currentMarket)
      || !_isEqual(nextProps.positions, positions)
      || !_isEqual(nextState.indicators, stateIndicators)
      || (nextState.settingsModalOpen !== settingsModalOpen)
      || !_isEqual(nextProps.exchanges, exchanges)
      || !_isEqual(nextProps.orders, orders)
      || (nextState.height !== height)
    ) {
      return true
    }

    if (nextState.lastDomain !== lastDomain) {
      return false // don't re-render on domain update (pan)
    } if (nextState.lastInternalCandleUpdate === lastInternalCandleUpdate) {
      return false
    }

    return true
  }

  componentDidUpdate() {
    this.deferSaveState()
  }

  componentWillUnmount() {
    const { removeCandlesRequirement, removeTradesRequirement } = this.props
    const { currentExchange, currentMarket, currentTF } = this.state

    if (this.chartRef && this.chartRef.unsubscribe) {
      this.chartRef.unsubscribe('chart-events')
    }

    removeCandlesRequirement(currentExchange, currentMarket, currentTF)
    removeTradesRequirement(currentExchange, currentMarket)
  }

  onIncreaseHeight() {
    this.setState(({ height }) => ({
      height: height + HEIGHT_STEP_PX,
    }))

    this.deferSaveState()
  }

  onDecreaseHeight() {
    this.setState(({ height }) => ({
      height: Math.max(height - HEIGHT_STEP_PX, MIN_HEIGHT_PX),
    }))

    this.deferSaveState()
  }

  onAddIndicator(v) {
    const I = Object.values(Indicators).find(i => i.id === v.value)
    const i = new I(I.args.map(arg => arg.default))

    // Copy metadata
    i.id = I.id
    i.ui = I.ui
    i.key = `${I.id}-${nonce()}`
    i.args = I.args.map(arg => arg.default)
    i.color = RandomColor({ luminosity: 'bright' })

    this.setState(({ indicators, indicatorData, candles }) => ({
      indicators: [
        ...indicators,
        i,
      ],

      indicatorData: {
        ...indicatorData,
        [i.key]: calcIndicatorValuesForCandles(i, candles),
      },
    }))

    setTimeout(() => { this.saveState() }, 0)
  }

  onRemoveIndicator(option) {
    const { value } = option

    this.setState(({ indicators, indicatorData }) => {
      const newIndicators = [...indicators]
      const index = newIndicators.findIndex(i => i.key === value)

      if (index < 0) {
        return {}
      }

      newIndicators.splice(index, 1)

      const { [value]: _, ...newIndicatorData } = indicatorData

      return {
        indicators: newIndicators,
        indicatorData: newIndicatorData,
      }
    })

    setTimeout(() => { this.saveState() }, 0)
  }

  onCandleSelectionChange() {
    setTimeout(() => {
      this.syncData()
      this.saveState()
    }, 0)
  }

  onChangeTF(tf) {
    const { currentExchange, currentMarket, currentTF } = this.state
    const {
      addCandlesRequirement, removeCandlesRequirement, onTFChange,
    } = this.props

    if (tf === currentTF) {
      return
    }

    this.setState(() => ({
      currentTF: tf,
      currentRange: defaultRangeForTF(tf),
    }))

    removeCandlesRequirement(currentExchange, currentMarket, currentTF)
    addCandlesRequirement(currentExchange, currentMarket, tf)
    this.onCandleSelectionChange()

    if (onTFChange) {
      onTFChange(tf)
    }
  }

  onChangeMarket(market) {
    const { currentExchange, currentMarket, currentTF } = this.state
    const {
      addCandlesRequirement, removeCandlesRequirement, addTradesRequirement,
      removeTradesRequirement,
    } = this.props

    if (market.uiID === currentMarket.uiID) {
      return
    }

    this.setState(() => {
      this.onCandleSelectionChange()

      return {
        currentMarket: market,
        marketDirty: true,
      }
    })

    removeCandlesRequirement(currentExchange, currentMarket, currentTF)
    removeTradesRequirement(currentExchange, currentMarket)
    addCandlesRequirement(currentExchange, market, currentTF)
    addTradesRequirement(currentExchange, market)
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange, currentMarket, currentTF } = this.state
    const {
      addCandlesRequirement, removeCandlesRequirement, reduxState,
      addTradesRequirement, removeTradesRequirement,
    } = this.props

    if (exchange === currentExchange) {
      return
    }

    const markets = getMarketsForExchange(reduxState, exchange)
    const newMarket = nearestMarket(currentMarket, markets)

    this.setState(() => {
      this.onCandleSelectionChange()

      return {
        currentMarket: newMarket,
        currentExchange: exchange,
        exchangeDirty: true,
        marketDirty: true,
      }
    })

    removeCandlesRequirement(currentExchange, currentMarket, currentTF)
    removeTradesRequirement(currentExchange, currentMarket)
    addCandlesRequirement(exchange, newMarket, currentTF)
    addTradesRequirement(exchange, newMarket)
  }

  onChartEvent(type, moreProps) {
    if (type !== 'pan') {
      return
    }

    const { xScale } = moreProps

    this.setState(() => ({
      lastDomain: xScale.domain(),
    }))

    this.deferSaveState()
  }

  onLoadMore(start, end) {
    const { currentTF, currentRange } = this.state

    if (Math.ceil(start) === end) {
      return
    }

    const rowsToDownload = 1000 // end - Math.ceil(start)
    const cWidth = TIME_FRAME_WIDTHS[currentTF]

    if (!cWidth) {
      console.error(`unknown candle TF width, cannot sync: ${currentTF}`)
      return
    }

    const newRange = [
      currentRange[0] - (cWidth * rowsToDownload),
      currentRange[0],
    ]

    this.setState(() => ({ currentRange: newRange }))

    setTimeout(() => {
      this.onCandleSelectionChange()
    })
  }

  onCloseSettingsModal() {
    this.setState(() => ({ settingsModalOpen: false }))
  }

  onSaveSettingsModalSettings(argValues) {
    const { settingsModalType, settingsModalProps } = this.state

    if (settingsModalType !== 'indicator') {
      console.error(`save unknown settings modal type: ${settingsModalType}`)
      return
    }

    const { i } = settingsModalProps

    this.deferSaveState()
    this.setState(({ indicators, indicatorData, candles }) => {
      const iIndex = indicators.findIndex(ind => ind.key === i.key)
      const nextIndicators = [...indicators]
      const nextIndicatorData = { ...indicatorData }

      if (iIndex < 0) {
        console.error(`could not save indicator, not found: ${i.key}`)
        return {}
      }

      const I = Object.values(Indicators).find(ind => ind.id === i._id)
      const args = I.args.map(arg => argValues[arg.label])
      const ind = new I(args)

      // Copy metadata
      ind.id = I.id
      ind.ui = I.ui
      ind.key = `${I.id}-${nonce()}`
      ind.args = args
      ind.color = indicators[iIndex].color

      nextIndicators[iIndex] = ind
      nextIndicatorData[ind.key] = calcIndicatorValuesForCandles(ind, candles)

      return {
        indicators: nextIndicators,
        indicatorData: nextIndicatorData,
        settingsModalOpen: false,
      }
    })
  }

  onOpenSettingsModal({ type, ...args }) {
    if (type !== 'indicator') {
      console.error(`open unknown settings modal type: ${type}`)
      return
    }

    this.setState(() => ({
      settingsModalOpen: true,
      settingsModalProps: args,
      settingsModalType: 'indicator',
    }))
  }


  syncData() {
    const { syncCandles } = this.props
    const {
      currentExchange, currentMarket, currentTF, currentRange,
    } = this.state

    syncCandles(currentExchange, currentMarket, currentTF, currentRange)
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const {
      currentExchange, currentMarket, currentTF, currentRange, indicators,
      marketDirty, exchangeDirty, height,
    } = this.state

    const {
      saveState, layoutID, layoutI, onRangeChange,
    } = this.props

    saveState(layoutID, layoutI, {
      marketDirty,
      exchangeDirty,
      currentExchange,
      currentMarket,
      currentRange,
      currentTF,
      height,
      indicatorIDs: indicators.map(i => i.id),
      indicatorArgs: indicators.map(i => i._args),
    })

    if (onRangeChange) {
      onRangeChange(currentRange)
    }
  }

  renderPanel(contents) {
    const {
      onChangeTF, onChangeMarket, onAddIndicator, onRemoveIndicator,
      onChangeExchange,
    } = this

    const {
      currentMarket, currentTF, indicators, marketDirty, settingsModalOpen,
      currentExchange, exchangeDirty, height,
    } = this.state

    const {
      label, onRemove, showIndicatorControls, reduxState, moveable,
      removeable, canChangeMarket, canChangeExchange, exchanges, className,
      showMarket, showExchange, dark,
    } = this.props

    const hasIndicators = !_isEmpty(indicators)
    const syncRanges = getSyncRanges(reduxState, currentExchange, currentMarket.restID, currentTF)
    const headerComponents = [
      showExchange && renderExchangeDropdown({
        disabled: !canChangeExchange,
        onChangeExchange,
        currentExchange,
        exchangeDirty,
        exchanges,
      }),

      renderTimeFrameDropdown({
        currentExchange,
        currentTF,
        onChangeTF,
      }),

      showMarket && renderMarketDropdown({
        disabled: !canChangeMarket,
        onChangeMarket,
        currentMarket,
        marketDirty,
        markets: getMarketsForExchange(reduxState, currentExchange),
      }),
    ]

    if (showIndicatorControls) {
      headerComponents.push(renderAddIndicatorDropdown({ onAddIndicator }))

      if (hasIndicators) {
        headerComponents.push(renderRemoveIndicatorDropdown({
          indicators,
          onRemoveIndicator,
        }))
      }
    }

    return (
      <Panel
        className={ClassNames('hfui-chart__wrapper', className)}
        moveable={moveable}
        removeable={removeable}
        onRemove={onRemove}
        label={label}
        darkHeader={dark}
        dark={dark}

        extraIcons={[
          <i
            role='button'
            tabIndex={0}
            key='increase-height'
            className='fas fa-caret-down'
            onClick={this.onIncreaseHeight}
          />,

          <i
            role='button'
            tabIndex={0}
            key='decrease-height'
            onClick={this.onDecreaseHeight}
            className={ClassNames('fas fa-caret-up', {
              disabled: height === MIN_HEIGHT_PX,
            })}
          />,

          !_isEmpty(syncRanges) && (
            <i key='sync' className='fas fa-circle-notch' />
          ),
        ]}

        headerComponents={headerComponents}
        modal={settingsModalOpen && this.renderSettingsModal()}
      >
        {contents || <Spinner />}
      </Panel>
    )
  }

  // TODO: Extract
  renderSettingsModal() {
    const { settingsModalProps, settingsModalType } = this.state

    if (settingsModalType !== 'indicator') {
      console.error(`render unknown settings modal type: ${settingsModalType}`)
      return null
    }

    return (
      <IndicatorSettingsModal
        {...settingsModalProps}

        onClose={this.onCloseSettingsModal}
        onSave={this.onSaveSettingsModalSettings}
        onRemove={(key) => { this.onRemoveIndicator({ value: key }) }}
      />
    )
  }

  render() {
    const {
      trades, ratio, orders: allOrders, disableIndicatorSettings, showOrders,
      positions: allPositions, showPositions, indicators: propsIndicators,
      indicatorData: propsIndicatorData,
    } = this.props

    const {
      candles, data, xScale, xAccessor, displayXAccessor, focus, currentMarket,
      currentExchange, height, indicators: stateIndicators,
      indicatorData: stateIndicatorData,
    } = this.state

    if (data.length < 5) { // TODO: Extract
      return this.renderPanel()
    }

    const indicators = _isEmpty(stateIndicators)
      ? propsIndicators
      : stateIndicators

    const indicatorData = _isEmpty(stateIndicatorData)
      ? propsIndicatorData
      : stateIndicatorData

    // TODO: Extract w/r resolution
    const orders = Object.values(allOrders[currentExchange] || {}).filter(({ symbol }) => (
      symbol === currentMarket[currentExchange === 'bitfinex' ? 'w' : 'r']
    ))

    const positions = Object
      .values(allPositions[currentExchange] || {})
      .filter(({ symbol }) => symbol === currentMarket)

    const lastCandle = _last(data)
    const start = xAccessor(data[Math.max(0, data.length - DEFAULT_ZOOM_CANDLE_COUNT)])
    const end = xAccessor(lastCandle)
    let xExtents = [start - 50, end + 50]

    if (focus) {
      if (focus.type === 'mts') {
        const candleWidth = data[1].mts - data[0].mts
        const i = data.findIndex((c) => {
          return focus.v > c.mts && (focus.v - c.mts) <= candleWidth
        })

        xExtents = [i - (DEFAULT_ZOOM_CANDLE_COUNT / 2), i + (DEFAULT_ZOOM_CANDLE_COUNT / 2)]
      } else if (focus.type === 'domain') {
        xExtents = focus.v
      } else {
        xExtents = [focus.v - DEFAULT_ZOOM_CANDLE_COUNT, focus.v]
      }
    }

    if (xExtents[0] > data.length) {
      xExtents = [start - 50, end + 50]
    }

    // Add padding for indicators that render below the main chart
    const externalIndicators = indicators.filter(i => i.ui.position === 'external')
    const extraIndicatorHeight = externalIndicators.length * 146
    const finalHeight = height + extraIndicatorHeight

    return this.renderPanel((
      <AutoSizer
        disableHeight
      >
        {({ width }) => {
          if (width <= 0) {
            return null
          }

          let settingsOverlayTextCount = 0

          return (
            <ChartCanvas
              height={finalHeight}
              width={width - 10}
              ratio={ratio}
              margin={{
                left: 50,
                right: 100,
                top: 10,
                bottom: 40 + (extraIndicatorHeight),
              }}

              ref={(chart) => {
                if (this.chartRef !== null) { // clean up old ref
                  this.chartRef.unsubscribe('chart-events')
                }

                if (chart !== null) {
                  this.chartRef = chart
                  this.chartRef.subscribe('chart-events', {
                    listener: this.onChartEvent,
                  })
                }
              }}

              type='hybrid'
              seriesName='HFC'
              data={data}
              xScale={xScale}
              xAccessor={xAccessor}
              displayXAccessor={displayXAccessor}
              xExtents={xExtents}
              onLoadMore={this.onLoadMore}
            >
              <RSChart
                id={1}
                yExtents={[d => [d.high, d.low]]}
              >
                <XAxis
                  axisAt='bottom'
                  orient='bottom'
                  tickStroke='#555461'
                  stroke='#555461'
                  ticks={5}
                />

                <YAxis
                  axisAt='right'
                  orient='right'
                  tickStroke='#555461'
                  stroke='#555461'
                  ticks={5}
                />

                <MouseCoordinateY
                  at='right'
                  orient='right'
                  displayFormat={format('~r')}
                />

                <BuyOrderAnnotation
                  trades={trades}
                  candles={candles}
                />

                <SellOrderAnnotation
                  trades={trades}
                  candles={candles}
                />

                <PriceCoordinate
                  at='left'
                  orient='left'
                  price={lastCandle.close}
                  lineStroke={lastCandle.close > lastCandle.open ? '#00D983' : '#F05359'}
                  lineOpacity={0.75}
                  stroke='#3490DC'
                  strokeWidth={1}
                  fill={lastCandle.close > lastCandle.open ? '#00D983' : '#F05359'}
                  textFill='#ffffff'
                  arrowWidth={7}
                  strokeDasharray='ShortDash'
                  displayFormat={format('~r')}
                />

                {showOrders && orders && orders.length > 0 && orders.map(o => (
                  <PriceCoordinate
                    key={o.id}
                    at='right'
                    orient='right'
                    price={+o.price}
                    lineStroke={o.amount > 0 ? '#00FF00' : '#FF0000'}
                    lineOpacity={1}
                    stroke='#3490DC'
                    strokeWidth={1}
                    fill='#0d101f'
                    textFill='#eeeeee'
                    arrowWidth={7}
                    strokeDasharray='ShortDash'
                    displayFormat={format('~r')}
                  />
                ))}

                {showPositions && positions && positions.length > 0 && positions.map(p => (
                  <PriceCoordinate
                    key={p.symbol}
                    at='right'
                    orient='right'
                    price={+p.basePrice}
                    lineStroke='#FFFFFF'
                    lineOpacity={0.75}
                    stroke='#3490DC'
                    strokeWidth={1}
                    fill='#FFFFFF'
                    textFill='#22292F'
                    arrowWidth={7}
                    strokeDasharray='ShortDash'
                    displayFormat={format('~r')}
                  />
                ))}

                {/* placeholder for event system */}
                <EventAnnotation
                  when={() => false}
                  height={finalHeight}
                  yOffset={30}
                  stroke='#ff0000'
                />

                {indicators.filter(i => i.ui.position === 'overlay' && i.ui.type === 'line').map(i => [
                  <LineSeries
                    yAccessor={d => indicatorData[i.key][d.mts]}
                    stroke={i.color}
                    strokeDasharray='Solid'
                    key={i.key}
                  />,

                  (!disableIndicatorSettings && (
                    <SettingsTextOverlay
                      key={`${i.key}-settings`}
                      forLabel={i.getName()}
                      color={i.color}
                      onClick={() => this.onOpenSettingsModal({ type: 'indicator', i })}
                      positionY={settingsOverlayTextCount++}
                      chartWidth={width}
                      right
                    />
                  )),
                ])}

                {indicators.filter(i => i.ui.position === 'overlay' && i.ui.type === 'lines').map(i => [
                  i.ui.lines.map(key => (
                    <LineSeries
                      yAccessor={d => ((indicatorData[i.key] || {})[d.mts] || {})[key]}
                      stroke={i.color}
                      strokeDasharray='Solid'
                      key={`${i.key}-${key}`}
                    />
                  )),

                  (!disableIndicatorSettings && (
                    <SettingsTextOverlay
                      key={`${i.key}-settings`}
                      forLabel={i.getName()}
                      color={i.color}
                      onClick={() => this.onOpenSettingsModal({ type: 'indicator', i })}
                      positionY={settingsOverlayTextCount++}
                      chartWidth={width}
                      right
                    />
                  )),
                ])}

                {indicators.filter(i => i.ui.position === 'overlay' && i.ui.type === 'bbands').map(i => [
                  <BollingerSeries
                    yAccessor={d => indicatorData[i.key][d.mts]}

                    stroke={i.ui.stroke || {
                      top: '#0000ff',
                      middle: '#0000aa',
                      bottom: '#0000ff',
                    }}

                    fill={i.ui.fill || '#333333'}
                    key={i.key}
                  />,

                  (!disableIndicatorSettings && (
                    <SettingsTextOverlay
                      key={`${i.key}-settings`}
                      forLabel={i.getName()}
                      color={i.color}
                      onClick={() => this.onOpenSettingsModal({ type: 'indicator', i })}
                      positionY={settingsOverlayTextCount++}
                      chartWidth={width}
                      right
                    />
                  )),
                ])}

                <CandlestickSeries
                  fill={d => (d.close > d.open ? '#00D983' : '#F05359')}
                  stroke={d => (d.close > d.open ? '#00D983' : '#F05359')}
                  wickStroke={d => (d.close > d.open ? '#00D983' : '#F05359')}
                />

                <OHLCTooltip
                  forChart={1}
                  origin={[-40, 10]}
                  xDisplayFormat={timeFormat('%Y-%m-%d')}
                  accessor={c => ({
                    ...c,
                    volume: c.volume,
                  })}
                />
              </RSChart>

              <RSChart
                id={2}
                height={150}
                yExtents={d => d.volume}
                origin={(w, h) => [0, h - 150]}
              >
                <YAxis
                  axisAt='left'
                  orient='left'
                  stroke='#555461'
                  tickStroke='#555461'
                  ticks={5}
                  tickFormat={format('.2s')}
                />

                <MouseCoordinateX
                  at='bottom'
                  orient='bottom'
                  displayFormat={timeFormat('%Y-%m-%d')}
                />

                <MouseCoordinateY
                  at='left'
                  orient='left'
                  displayFormat={format('~r')}
                />

                <BarSeries
                  yAccessor={d => d.volume}
                  fill={d => (d.close > d.open ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)')}
                />
              </RSChart>

              {!_isEmpty(externalIndicators)
                && renderExternalIndicators({
                  onOpenSettings: this.onOpenSettingsModal,
                  indicators: externalIndicators,
                  indicatorData,
                })
              }

              <CrossHairCursor
                stroke='#EEEEEE'
                opacity={1}
              />
            </ChartCanvas>
          )
        }}
      </AutoSizer>
    ))
  }
}

export default fitWidth(Chart)
