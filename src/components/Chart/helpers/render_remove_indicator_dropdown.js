import React from 'react'
import Select from '../../../ui/Select'

const LABEL = '- Indicator'

export default ({ onRemoveIndicator, indicators }) => (
  <Select
    key='rm-indicator-dropdown'
    className='indicator-select'
    placeholder='- Indicator'
    onChange={onRemoveIndicator}
    value={{ label: LABEL, value: '' }}
    options={Object.values(indicators).map(i => ({
      label: i.humanLabel,
      value: i.key,
    }))}
  />
)
