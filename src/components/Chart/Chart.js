import React from 'react'
import PropTypes from 'prop-types'
import { select as d3Select } from 'd3-selection'
import { AutoSizer } from 'react-virtualized'
import _last from 'lodash/last'
import _reverse from 'lodash/reverse'

import Panel from '../../ui/Panel'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation'
import { ChartCanvas, Chart } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import BuyOrderAnnotation from './Annotations/BuyOrderAnnotation'

class HFChart extends React.PureComponent {
  static propTypes = {
    candles: PropTypes.array,
    trades: PropTypes.array
  }

  static defaultProps = {
    candles: [],
    trades: []
  }

  static tradeMTSMap (trades) {
    const mtsMap = {}
    trades.forEach(({ trade }) => mtsMap[`${trade.mts}`] = true)
    return mtsMap
  }

  constructor(props) {
    super(props)

    this.state = {
      strategyTradeMTS: HFChart.tradeMTSMap(props.trades),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { trades } = nextProps

    if (this.props.trades !== trades) {
      this.setState(() => ({
        strategyTradeMTS: HFChart.tradeMTSMap(trades)
      }))
    }
  }

  render () {
    const { strategyTradeMTS } = this.state
    const { candles, trades, ratio } = this.props

    if (candles.length === 0) {
      return null
    }

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(c => c.date)

		const {
      data, xScale, displayXAccessor, xAccessor
    } = xScaleProvider(candles.map(({ c }) => ({
      date: new Date(c.mts),
      volume: c.vol,
      ...c
    })))

		const start = xAccessor(data[Math.max(0, data.length - 1000)])
		const end = xAccessor(_last(data))
    const xExtents = [start, end]

    return (
      <div style={{ height: 500, background: '#000' }}>
        <AutoSizer>
          {({ width, height }) => width > 0 && height > 0 && (
            <ChartCanvas
              height={height}
              width={width}
              ratio={ratio}
              margin={{ left: 70, right: 70, top: 10, bottom: 50 }}
              type='hybrid'
              seriesName='Test Series'
              data={data}
              xScale={xScale}
              xAccessor={xAccessor}
              displayXAccessor={displayXAccessor}
              xExtents={xExtents}
            >
              <Chart
                id={1}
                yExtents={[d => [d.high, d.low]]}
              >
                <XAxis
                  axisAt='bottom'
                  orient='bottom'
                  tickStroke='#ffffff'
                  stroke='#ffffff'
                  ticks={5}
                />

                <YAxis
                  axisAt='right'
                  orient='right'
                  tickStroke='#ffffff'
                  stroke='#ffffff'
                  ticks={5}
                />

                <MouseCoordinateY
                  at='right'
                  orient='right'
                  displayFormat={format('.2f')}
                />

                <CandlestickSeries />
                <OHLCTooltip forChart={1} origin={[-40, 10]} />

                <Annotate
                  with={BuyOrderAnnotation}
                  when={d => !!strategyTradeMTS[`${+d.date}`]}
                  usingProps={{
                    fontSize: 36,
                    fontFamily: 'Glyphicons Halflings',
                    fill: '#00FF00',
                    opacity: 0.8,
                    text: '\u2191',
                    onClick: console.log.bind(console),
                    tooltip: d => timeFormat('%B')(d.date),
                    x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
                    y: ({ datum, yScale }) => {
                      const { mts } = datum
                      const trade = trades.find(t => t.mts === mts)
                      console.log(datum) // yScale.range()[0],

                      return yScale(datum.high)
                    },
                  }}
                />
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
                  stroke='#ffffff'
                  tickStroke='#ffffff'
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
                  fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
                />
              </Chart>
              <CrossHairCursor />
            </ChartCanvas>
          )}
        </AutoSizer>
      </div>
    )
  }
}

HFChart = fitWidth(HFChart)

export default HFChart
