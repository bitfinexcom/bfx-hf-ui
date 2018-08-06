import React from 'react'

import BTHistoricalSidebar from '../../../components/BTHistoricalSidebar'
import BTHistoricalContent from '../../../components/BTHistoricalContent'

export default class BTHistoricalView extends React.PureComponent {
  render() {
    return (
      <div className='hfui__wrapper'>
        <BTHistoricalSidebar />
        <BTHistoricalContent />
      </div>
    )
  }
}
