import React from 'react'
import BacktestList from '../BacktestList'

export default class BTHistoricalSidebar extends React.PureComponent {
  render () {
    const {
      bts,
      onSelectBT
    } = this.props

    return (
      <div className='hfui__sidebar'>
        <BacktestList
          bts={bts}
          onSelect={onSelectBT}
        />
      </div>
    )
  }
}
