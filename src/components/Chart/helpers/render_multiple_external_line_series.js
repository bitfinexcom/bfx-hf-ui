import React from 'react'
import { format } from 'd3-format'
import { LineSeries } from 'react-stockcharts/lib/series'
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip'
import SettingsTextOverlay from '../SettingsTextOverlay'

export default (i, indicatorData, onOpenSettings) => {
  return [
    i.ui.lines.map(key => (
      <LineSeries
        yAccessor={d => indicatorData[i.key][d.mts][key]}
        stroke={i.color}
        strokeDasharray='Solid'
        key={`${i.key}-${key}`}
      />
    )),

    i.ui.lines.map((key, n) => (
      <SingleValueTooltip
        key={`${i.key}-${key}-tooltip`}
        yAccessor={d => indicatorData[i.key][d.mts][key]}
        yLabel={key}
        yDisplayFormat={format('.2f')}
        origin={[-20, 35 + (20 * n)]}
        valueFill='#ffffff'
      />
    )),

    <SettingsTextOverlay
      key={`${i.key}-settings`}
      onClick={() => onOpenSettings({ type: 'indicator', i })}
      positionY={i.ui.lines.length + 1}
      forLabel={i._name}
    />,
  ]
}
