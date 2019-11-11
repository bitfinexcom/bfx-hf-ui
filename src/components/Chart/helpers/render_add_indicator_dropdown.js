import React from 'react'
import Indicators from 'bfx-hf-indicators'
import Select from '../../../ui/Select'

const LABEL = '+ Indicator'

export default ({ onAddIndicator }) => ( // eslint-disable-line
  <Select
    className='indicator-select'
    key='add-indicator-dropdown'
    placeholder='+ Indicator'
    onChange={onAddIndicator}
    value={{ label: LABEL, value: '' }}
    options={Object.values(Indicators).filter(i => !!i.id).map(i => ({
      label: i.humanLabel,
      value: i.id,
    }))}
  />
)
