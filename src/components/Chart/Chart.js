import React from 'react'
import { AutoSizer } from 'react-virtualized'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
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

import BuyOrderAnnotation from './BuyOrderAnnotation'
import SellOrderAnnotation from './SellOrderAnnotation'
import { propTypes, defaultProps } from './Chart.props'
import Panel from '../../ui/Panel'

import './style.css'

class HFChart extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const { candles, trades, ratio } = this.props

    if (_isEmpty(candles)) {
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
      <Panel
        label='Backtest Results'
        contentClassName='chart__wrapper'
      >
        <AutoSizer>
          {({ width, height }) => width > 0 && height > 0 && (
            <ChartCanvas
              height={height}
              width={width}
              ratio={ratio}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
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

                <CandlestickSeries
                  fill={d => d.close > d.open ? '#3c9d37' : '#990f0f'}
                  stroke={d => d.close > d.open ? '#49bf43' : '#cc1414'}
                  wickStroke={d => d.close > d.open ? '#49bf43' : '#cc1414'}
                />

                <OHLCTooltip forChart={1} origin={[-40, 10]} />

                <BuyOrderAnnotation
                  trades={trades}
                  candles={candles}
                />

                <SellOrderAnnotation
                  trades={trades}
                  candles={candles}
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
                  fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
                />
              </Chart>

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
