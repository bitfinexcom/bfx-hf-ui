import React from 'react'

import Dropdown from '../../../ui/Dropdown'
import TimeFrames from '../../../util/time_frames'

// TODO: Use TimeFrameDropdown
export default ({ currentExchange, currentTF, onChangeTF }) => { // eslint-disable-line
  const options = []
  const tfLabels = Object.keys(TimeFrames[currentExchange] || {})

  for (let i = 0; i < tfLabels.length; i += 1) {
    options.push({
      label: tfLabels[i],
      value: TimeFrames[currentExchange][tfLabels[i]],
    })
  }

  return (
    <Dropdown
      key='tf-dropdown'
      fallback='Select a time frame'
      onChange={onChangeTF}
      value={currentTF}
      options={options}
    />
  )
}
