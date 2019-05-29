import React from 'react'
import { AutoSizer } from 'react-virtualized'
import _last from 'lodash/last'
import _isEmpty from 'lodash/isEmpty'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ChartCanvas, Chart } from 'react-stockcharts'
import { LineSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { ClickCallback } from 'react-stockcharts/lib/interactive'

import Panel from '../../ui/Panel'

class PLChart extends React.PureComponent {
  state = {
    trades: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { dataKey, trades } = nextProps

    if (
      (dataKey === prevState.dataKey)
      && (trades.length === prevState.trades.length)
    ) {
      return null
    }

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(t => t.date)

    const {
      data, xScale, displayXAccessor, xAccessor,
    } = xScaleProvider(trades)

    return {
      dataKey,
      data,
      xScale,
      xAccessor,
      displayXAccessor,
      trades,
    }
  }

  render() {
    const { ratio, onClick, label } = this.props
    const {
      data, xScale, xAccessor, displayXAccessor,
    } = this.state

    if (_isEmpty(data)) {
      return null
    }

    const start = xAccessor(data[Math.max(0, data.length - 1000)])
    const end = xAccessor(_last(data))
    const xExtents = [start, end]
    const height = 250

    return (
      <Panel
        label={label || 'P/L'}
        contentClassName='chart__wrapper'
        upperLabel
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
                bottom: 50,
              }}

              type='hybrid'
              seriesName='P/L'
              data={data}
              xScale={xScale}
              xAccessor={xAccessor}
              displayXAccessor={displayXAccessor}
              xExtents={xExtents}
            >
              <Chart
                id={40}
                yExtents={[d => [d.pl, d.pl]]}
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

                <MouseCoordinateX
                  at='bottom'
                  orient='bottom'
                  displayFormat={timeFormat('%Y-%m-%d')}
                />

                <MouseCoordinateY
                  at='right'
                  orient='right'
                  displayFormat={format('.2f')}
                />

                <LineSeries
                  yAccessor={d => d.pl}
                  stroke='#00ff00'
                  strokeDasharray='Solid'
                />

                <SingleValueTooltip
                  yAccessor={d => d.pl}
                  yLabel='P/L'
                  yDisplayFormat={format('.2f')}
                  origin={[-20, 15]}
                  valueFill='#ffffff'
                />

                {onClick && (
                  <ClickCallback
                    onClick={(props, e) => { onClick(props.currentItem) }}
                  />
                )}
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

PLChart = fitWidth(PLChart)

export default PLChart
