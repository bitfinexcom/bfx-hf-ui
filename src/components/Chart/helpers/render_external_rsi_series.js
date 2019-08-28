import React from 'react'
import { RSISeries } from 'react-stockcharts/lib/series'
import { RSITooltip } from 'react-stockcharts/lib/tooltip'

import SettingsTextOverlay from '../SettingsTextOverlay'

export default (i, indicatorData, onOpenSettings, n) => [
  <RSISeries
    key={i.key}
    yAccessor={d => indicatorData[i.key][d.mts]}
  />,

  <RSITooltip
    key={`${i.key}-tooltip`}
    origin={[-20, 15]}
    yAccessor={d => indicatorData[i.key][d.mts]}
    options={{
      windowSize: +i.args[0],
    }}
  />,

  <SettingsTextOverlay
    key={`${i.key}-settings`}
    onClick={() => onOpenSettings({ type: 'indicator', i })}
    positionY={1}
  />
]
