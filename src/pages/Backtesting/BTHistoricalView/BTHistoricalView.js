import React from 'react'

import BTHistoricalSidebar from '../../../components/BTHistoricalSidebar'
import BTHistoricalContent from '../../../components/BTHistoricalContent'
import ID from '../../../util/id'

export default class BTHistoricalView extends React.Component {
  state = {
    dataKey: ID(),
  }

  constructor(props) {
    super(props)

    this.onSelectBT = this.onSelectBT.bind(this)
  }

  componentDidMount() {
    const { getBTs } = this.props
    getBTs()
  }

  onSelectBT(selectedBT) {
    this.setState(() => ({
      selectedBT,
      dataKey: ID(),
    }))
  }

  render() {
    const { bts = {} } = this.props
    const { selectedBT, dataKey } = this.state

    return [
      <BTHistoricalSidebar
        key='sidebar'
        bts={Object.values(bts)}
        onSelectBT={this.onSelectBT}
      />,

      <BTHistoricalContent
        className='hfui__content'
        key='content'
        bt={selectedBT}
        dataKey={dataKey}
      />,
    ]
  }
}
