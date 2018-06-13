import React from 'react'
import PropTypes from 'prop-types'
import { select as d3Select } from 'd3-selection'
import { AutoSizer } from 'react-virtualized'
import D3 from '../../util/d3'
import Techan from 'techan'
import _last from 'lodash/last'

import Panel from '../../ui/Panel'

export default class Chart extends React.PureComponent {
  static propTypes = {
    candles: PropTypes.array,
    trades: PropTypes.array
  }

  static defaultProps = {
    candles: [],
    trades: []
  }

  constructor (props) {
    super(props)

    this._width = -1
    this._height = -1
    this._svg = null

    this.onZoom = this.onZoom.bind(this)
    this.recvSVGRef = this.recvSVGRef.bind(this)
  }

  componentDidMount () {
    this._initialRender = true
  }

  componentWillUnmount () {
    this._initialRender = true
  }

  componentDidUpdate (prevProps) {
    const { candles, trades } = this.props

    if (
      (prevProps.candles !== candles) ||
      (prevProps.trades !== trades)
    ) {
      this.refreshD3()
    }
  }

  onZoom () {
    const scaledX = D3.event.transform.rescaleX(this._scaleX)
    const scaledY = D3.event.transform.rescaleY(this._scaleY)

    this._axisX.scale(scaledX)
    this._axisY.scale(scaledY)

    this._plotCandles.xScale(scaledX)
    this._plotCandles.yScale(scaledY)

    this._plotTrades.xScale(scaledX)
    this._plotTrades.yScale(scaledY)

    this.drawD3()
  }

  updateD3Components (width, height) {
    if (this._width === width && this._height === height) {
      return
    }

    this._width = width
    this._height = height

    this._scaleX = D3.scaleTime().range([0, width])
    this._scaleY = D3.scaleLinear().range([height, 0])

    this._axisX = D3.axisBottom(this._scaleX)
    this._axisY = D3.axisLeft(this._scaleY)

    this._plotTrades = Techan.plot.tradearrow()
      .xScale(this._scaleX)
      .yScale(this._scaleY)

    this._plotCandles = Techan.plot.candlestick()
      .xScale(this._scaleX)
      .yScale(this._scaleY)

    this._zoom = D3.zoom().on('zoom', this.onZoom)
  }

  refreshD3 () {
    if (this._svg === null) {
      console.warn('no svg reference, can\'t refresh D3')
      return
    }

    const { candles, trades } = this.props
    const accessor = this._plotCandles.accessor()
    const lastCandle = _last(candles)

    const stratTradeData = trades
      .filter(({ trade }) => trade.mts < lastCandle.c.mts)
      .map(({ trade = {} }) => ({
        date: new Date(trade.mts),
        type: trade.amount > 0 ? 'buy' : 'sell',
        ...trade
      }))

    const candleData = candles.map(({ c = {} }) => ({
      date: new Date(c.mts),
      volume: c.vol,
      ...c
    })).sort((a, b) => (
      D3.ascending(accessor.d(a), accessor.d(b))
    ))

    const svg = d3Select(this._svg)

    this._scaleX.domain(D3.extent(candleData.map(accessor.d)))
    this._scaleY.domain(Techan.scale.plot.ohlc(candleData, accessor).domain())

    svg.select('g.candlestick').datum(candleData)
    svg.select('g.tradearrow').datum(stratTradeData)

    this.drawD3(false)
  }

  drawD3 (refresh = true) {
    if (this._svg === null) {
      console.warn('no svg reference, can\'t render D3 dataset')
      return
    }

    const svg = d3Select(this._svg)

    svg.select('g.candlestick').call(refresh ? this._plotCandles.refresh : this._plotCandles)
    svg.select('g.tradearrow').call(refresh ? this._plotTrades.refresh : this._plotTrades)
    svg.select('g.x.axis').call(this._axisX)
    svg.select('g.y.axis').call(this._axisY)
  }

  recvSVGRef (svg) {
    this._svg = svg

    const d3SVG = d3Select(svg)
    d3SVG.select('#hfui-chart-pane').call(this._zoom)

    // TODO: Render after autosizer dimension init
    if (this._initialRender) {
      this._initialRender = false
      setTimeout(this.refreshD3.bind(this), 0)
    }
  }

  render () {
    const vMargin = 50
    const hMargin = 20 // TODO: Extract

    return (
      <Panel label='Chart' style={{ height: 500 }}>
        <AutoSizer>
          {({ width, height }) => {
            if (width === 0 || height === 0) {
              return null // TODO: Loading state
            }

            this.updateD3Components(width, height - vMargin)

            return (
              <svg
                width={width}
                height={height}
                ref={this.recvSVGRef}
              >
                <g transform={`translate(${vMargin}, ${hMargin})`}>
                  <clipPath id='clip'>
                    <rect
                      x={0}
                      y={0}
                      width={width - vMargin}
                      height={height - vMargin}
                    />
                  </clipPath>

                  <g className='candlestick' clipPath='url(#clip)' />
                  <g className='tradearrow' clipPath='url(#clip)' />

                  <g
                    className='x axis'
                    transform={`translate(0, ${height - vMargin})`}
                  />

                  <g className='y axis'>
                    <text
                      style={{ textAnchor: 'end'}}
                      transform='rotate(-90)'
                      y={6}
                      dy='0.71em'
                    >Price ($)</text>
                  </g>

                  <rect
                    id='hfui-chart-pane'
                    className='pane'
                    width={width}
                    height={height}
                  />
                </g>
              </svg>
            )
          }}
        </AutoSizer>
      </Panel>
    )
  }
}
