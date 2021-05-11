import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from '../../ui/Dropdown'
import timeFrames from '../../util/time_frames'

const TimeFrameDropdown = ({ tf, onChange }) => {
  const options = []
  const tfLabels = Object.keys(timeFrames)

  for (let i = 0; i < tfLabels.length; ++i) {
    options.push({
      label: tfLabels[i],
      value: timeFrames[tfLabels[i]],
    })
  }

  return (
    <div className='hfui-backtester__executionform'>
      <div className='hfui-backtester__executiondropdown input-label'>
        <Dropdown
          key='tf-dropdown'
          placeholder='Select a time frame'
          onChange={onChange}
          value={tf}
          options={options}
        />
      </div>
    </div>
  )
}

TimeFrameDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  tf: PropTypes.string.isRequired,
}

export default TimeFrameDropdown
