import React from 'react'
import { format } from 'd3-format'
import { LineSeries } from 'react-stockcharts/lib/series'
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip'
import SettingsTextOverlay from '../SettingsTextOverlay'

export default (i, indicatorData, onOpenSettings) => [
  <LineSeries
    yAccessor={d => indicatorData[i.key][d.mts]}
    stroke={i.color}
    strokeDasharray='Solid'
    key={i.key}
  />,

  <SingleValueTooltip
    key={`${i.key}-tooltip`}
    yAccessor={d => indicatorData[i.key][d.mts]}
    yLabel={i._name}
    yDisplayFormat={format('.2f')}
    origin={[-20, 15]}
    valueFill='#ffffff'
  />,

  <SettingsTextOverlay
    key={`${i.key}-settings`}
    onClick={() => onOpenSettings({ type: 'indicator', i })}
    positionY={1}
  />,
]
