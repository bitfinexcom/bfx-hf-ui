import React from 'react'
import { format } from 'd3-format'
import { Chart as RSChart } from 'react-stockcharts/'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { MouseCoordinateY } from 'react-stockcharts/lib/coordinates'

import renderMultipleExternalLineSeries from './render_multiple_external_line_series'
import renderExternalLineSeries from './render_external_line_series'
import renderExternalRSISeries from './render_external_rsi_series'
import renderExternalMACDSeries from './render_external_macd_series'

export default ({ indicators, indicatorData, onOpenSettings }) => {
  return indicators.map((i, n) => (
    <RSChart
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

      {n === indicators.length - 1 && (
        <XAxis
          axisAt='bottom'
          orient='bottom'
          tickStroke='#AAAAAA'
          stroke='#AAAAAA'
          ticks={5}
        />
      )}

      {i.ui.type === 'lines' && renderMultipleExternalLineSeries(i, indicatorData, onOpenSettings)}
      {i.ui.type === 'line' && renderExternalLineSeries(i, indicatorData, onOpenSettings)}
      {i.ui.type === 'rsi' && renderExternalRSISeries(i, indicatorData, onOpenSettings)}
      {i.ui.type === 'macd' && renderExternalMACDSeries(i, indicatorData, onOpenSettings)}
    </RSChart>
  ))
}
