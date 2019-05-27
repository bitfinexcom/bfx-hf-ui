import React from 'react'
import { AutoSizer } from 'react-virtualized'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ChartCanvas, Chart } from 'react-stockcharts'
import {
  BarSeries, CandlestickSeries, LineSeries, BollingerSeries, RSISeries
} from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  SingleValueTooltip, OHLCTooltip, RSITooltip
} from 'react-stockcharts/lib/tooltip'

import { PriceCoordinate } from "react-stockcharts/lib/coordinates"
import { fitWidth } from 'react-stockcharts/lib/helper'

import BuyOrderAnnotation from './BuyOrderAnnotation'
import SellOrderAnnotation from './SellOrderAnnotation'
import EventAnnotation from './EventAnnotation'
import { propTypes, defaultProps } from './Chart.props'
import Panel from '../../ui/Panel'

import './style.css'

class HFChart extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor (props) {
    super(props)

    this.state = {
      candles: [],
      focus: null,
      prevFocusMTS: null,
      lastDomain: null,

      ...HFChart.genChartData([])
    }

    this.onLoadMore = this.onLoadMore.bind(this)
    this.onChartEvent = this.onChartEvent.bind(this)
    this.chartRef = null
  }

  componentWillUnmount () {
    if (this.chartRef.unsubscribe) {
      this.chartRef.unsubscribe('chart-events')
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.lastDomain !== this.state.lastDomain) {
      return false // don't re-render on domain update (pan)
    }

    return true
  }

  onChartEvent (type, moreProps, state = {}) {
    if (type !== 'pan') {
      return
    }

    const { xScale } = moreProps

    this.setState(() => ({
      lastDomain: xScale.domain()
    }))
  }

  onLoadMore (start, end) {
    if (Math.ceil(start) === end) {
      return
    }

    const rowsToDownload = end - Math.ceil(start)
    const { onLoadMore } = this.props

    onLoadMore(rowsToDownload)
  }

  static genChartData (candles = []) {
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(c => c.date)

    const {
      data, xScale, displayXAccessor, xAccessor
    } = xScaleProvider(candles)

    return {
      data,
      xScale,
      displayXAccessor,
      xAccessor
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { focusMTS, dataKey, candles } = nextProps
    let focus = focusMTS && focusMTS !== prevState.prevFocusMTS
      ? { type: 'mts', v: focusMTS } // focusMTS changed
      : prevState.focus

    if (
      (dataKey === prevState.dataKey) &&
      (candles.length === prevState.candles.length)
    ) {
      return { focus }
    } else if (candles.length > prevState.candles.length) {
      if (prevState.candles.length === 0) {
        focus = { type: 'index', v: candles.length - 1 }
      } else {
        const candleDelta = candles.length - prevState.candles.length

        focus = {
          type: 'domain',
          v: [
            prevState.lastDomain[0] + candleDelta,
            prevState.lastDomain[1] + candleDelta,
          ]
        }
      }
    }

    return {
      focus,
      prevFocusMTS: focusMTS,
      dataKey,
      candles,

      ...HFChart.genChartData(candles)
    }
  }

  render () {
    const {
      trades, ratio, indicators, indicatorData, orders
    } = this.props

    const {
      candles, data, xScale, xAccessor, displayXAccessor, focus
    } = this.state

    if (_isEmpty(data)) {
      return null
    }

		const start = xAccessor(data[Math.max(0, data.length - 1000)])
		const end = xAccessor(_last(data))
    let xExtents = [start, end]

    if (focus) {
      if (focus.type === 'mts') {
        const candleWidth = data[1].mts - data[0].mts
        const i = data.findIndex(c => {
          return focus.v > c.mts && (focus.v - c.mts) <= candleWidth
        })

        xExtents = [i - 250, i + 250]
      } else if (focus.type === 'domain') {
        xExtents = focus.v
      } else {
        xExtents = [focus.v - 250, focus.v + 250]
      }
    }

    // Add padding for indicators that render below the main chart
    const externalIndicators = indicators.filter(i => i.ui.position === 'external')
    const extraIndicatorHeight = externalIndicators.length * 155
    const height = 500 + (externalIndicators.length * 155)

    return (
      <Panel
        contentClassName='chart__wrapper'
      >
        <AutoSizer
          disableHeight
        >
          {({ width }) => width > 0 && (
            <ChartCanvas
              height={height}
              width={width}
              ratio={ratio}
              margin={{
                left: 50,
                right: 50,
                top: 10,
                bottom: 20 + (extraIndicatorHeight || 30)
              }}

              ref={(chart) => {
                if (this.chartRef !== null) { // clean up old ref
                  this.chartRef.unsubscribe('chart-events')
                }

                if (chart !== null) {
                  this.chartRef = chart
                  this.chartRef.subscribe('chart-events', {
                    listener: this.onChartEvent
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
              <Chart
                id={1}
                yExtents={[d => [d.high, d.low]]}
              >
                <XAxis
                  axisAt='bottom'
                  orient='bottom'
                  tickStroke='#AAAAAA'
                  stroke='#AAAAAA'
                  ticks={5}
                />

                <YAxis
                  axisAt='right'
                  orient='right'
                  tickStroke='#AAAAAA'
                  stroke='#AAAAAA'
                  ticks={5}
                />

                <MouseCoordinateY
                  at='right'
                  orient='right'
                  displayFormat={format('.2f')}
                />

                <BuyOrderAnnotation
                  trades={trades}
                  candles={candles}
                />

                <SellOrderAnnotation
                  trades={trades}
                  candles={candles}
                />

                {orders.map(o => (
                  <PriceCoordinate
                    key={o[2]}
                    at="right"
                    orient="right"
                    price={o[16]}
                    lineStroke="#00FF00"
                    lineOpacity={1}
                    stroke="#3490DC"
                    strokeWidth={1}
                    fill="#FFFFFF"
                    textFill="#22292F"
                    arrowWidth={7}
                    strokeDasharray="ShortDash"
                    displayFormat={format(".2f")}
                  />
                ))}

                {/* placeholder for event system */}
                <EventAnnotation
                  when={d => false}
                  height={height}
                  yOffset={30}
                  stroke="#ff0000"
                />

                {indicators.filter(i =>
                  i.ui.position === 'overlay' && i.ui.type === 'line'
                ).map(i =>
                  <LineSeries
                    yAccessor={d => indicatorData[i.key][d.mts]}
                    stroke={i.color}
                    strokeDasharray="Solid"
                    key={i.key}
                  />
                )}

                {indicators.filter(i =>
                  i.ui.position === 'overlay' && i.ui.type === 'lines'
                ).map(i => i.ui.lines.map(key => (
                  <LineSeries
                    yAccessor={d => indicatorData[i.key][d.mts][key]}
                    stroke={i.color}
                    strokeDasharray='Solid'
                    key={`${i.key}-${key}`}
                  />
                )))}

                {indicators.filter(i =>
                  i.ui.position === 'overlay' && i.ui.type === 'bbands'
                ).map(i =>
                  <BollingerSeries
                    yAccessor={d => indicatorData[i.key][d.mts]}

                    stroke={i.ui.stroke || {
                      top: "#0000ff",
                      middle: "#0000aa",
                      bottom: "#0000ff",
                    }}

                    fill={i.ui.fill || "#333333"}
                    key={i.key}
                  />
                )}

                <CandlestickSeries
                  fill={d => d.close > d.open ? '#3c9d37' : '#990f0f'}
                  stroke={d => d.close > d.open ? '#49bf43' : '#cc1414'}
                  wickStroke={d => d.close > d.open ? '#49bf43' : '#cc1414'}
                />

                <OHLCTooltip forChart={1} origin={[-40, 10]} />
              </Chart>

              <Chart
                id={2}
                height={150}
                yExtents={d => d.vol}
                origin={(w, h) => [0, h - 150]}
              >
                <YAxis
                  axisAt='left'
                  orient='left'
                  stroke='#CCCCCC'
                  tickStroke='#CCCCCC'
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
                  displayFormat={format('.4s')}
                />

                <BarSeries
                  yAccessor={d => d.vol}
                  fill={d => (d.close > d.open ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)')}
                />
              </Chart>

              {externalIndicators.map((i, n) =>
                <Chart
                  id={3 + n}
                  yExtents={d => indicatorData[i.key][d.mts]}
                  height={125}
                  origin={(w, h) => [0, 20 + h + (n * 145)]}
                  key={n}
                >
                  <XAxis
                    axisAt='bottom'
                    orient='bottom'
                    showTicks={false}
                    outerTickSize={0}
                  />

                  <YAxis
                    axisAt='right'
                    orient='right'
                    ticks={5}
                    stroke='#CCCCCC'
                    tickStroke='#CCCCCC'
                  />

                  <MouseCoordinateY
                    at='right'
                    orient='right'
                    displayFormat={format('.2f')}
                  />

                  {n === externalIndicators.length - 1 && (
                    <XAxis
                      axisAt='bottom'
                      orient='bottom'
                      tickStroke='#AAAAAA'
                      stroke='#AAAAAA'
                      ticks={5}
                    />
                  )}

                  {i.ui.type === 'lines' && i.ui.lines.map(key => (
                    <LineSeries
                      yAccessor={d => indicatorData[i.key][d.mts][key]}
                      stroke={i.color}
                      strokeDasharray='Solid'
                      key={`${i.key}-${key}`}
                    />
                  ))}
 
                  {i.ui.type === 'line' && [
                    <LineSeries
                      yAccessor={d => indicatorData[i.key][d.mts]}
                      stroke={i.color}
                      strokeDasharray='Solid'
                      key={i.key}
                    />
                  ,
                    <SingleValueTooltip
                      key={`${i.key}-tooltip`}
                      yAccessor={d => indicatorData[i.key][d.mts]}
                      yLabel={i.key}
                      yDisplayFormat={format('.2f')}
                      origin={[-20, 15]}
                      valueFill='#ffffff'
                    />
                  ]}

                  {i.ui.type === 'rsi' && [
                    <RSISeries
                      key={i.key}
                      yAccessor={d => indicatorData[i.key][d.mts]}
                    />,
                    <RSITooltip
                      key={`${i.key}-tooltip`}
                      origin={[-20, 15]}
                      yAccessor={d => indicatorData[i.key][d.mts]}
                      options={{
                        windowSize: +i.args[0].value,
                      }}
                    />
                  ]}
                </Chart>
              )}

              <CrossHairCursor
                stroke='#EEEEEE'
                opacity={1}
              />
            </ChartCanvas>
          )}
        </AutoSizer>
      </Panel>
    )
  }
}

HFChart = fitWidth(HFChart)

export default HFChart
