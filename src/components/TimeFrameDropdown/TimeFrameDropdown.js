import React from 'react'

import Dropdown from '../../ui/Dropdown'
import TimeFrames from '../../util/time_frames'
import { propTypes, defaultProps } from './TimeFrameDropdown.props'

export default class TimeFrameDropdown extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { exID, tf, onChange } = this.props
    const options = []
    const tfLabels = Object.keys(TimeFrames[exID] || {})

    for (let i = 0; i < tfLabels.length; i += 1) {
      options.push({
        label: tfLabels[i],
        value: TimeFrames[exID][tfLabels[i]],
      })
    }

    return (
      <Dropdown
        key='tf-dropdown'
        fallback='Select a time frame'
        onChange={onChange}
        value={tf}
        options={options}
      />
    )
  }
}
