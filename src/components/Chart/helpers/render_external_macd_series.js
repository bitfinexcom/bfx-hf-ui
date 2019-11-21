import React from 'react'
import { MACDSeries } from 'react-stockcharts/lib/series'
import { MACDTooltip } from 'react-stockcharts/lib/tooltip'

import SettingsTextOverlay from '../SettingsTextOverlay'

const appearance = {
  stroke: {
    macd: '#FF0000',
    signal: '#00F300',
  },
  fill: {
    divergence: '#4682B4',
  },
}

export default (i, indicatorData, onOpenSettings) => [
  <MACDSeries
    key={i.key}
    yAccessor={d => indicatorData[i.key][d.mts]}
    {...appearance}
  />,

  <MACDTooltip
    key={`${i.key}-tooltip`}
    origin={[-20, 15]}
    yAccessor={d => indicatorData[i.key][d.mts]}
    appearance={appearance}
    options={{
      fast: +i.args[0],
      slow: +i.args[1],
      signal: +i.args[2],
    }}
  />,

  <SettingsTextOverlay
    key={`${i.key}-settings`}
    onClick={() => onOpenSettings({ type: 'indicator', i })}
    positionY={1}
  />,
]
