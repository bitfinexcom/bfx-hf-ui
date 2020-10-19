import React from 'react'

import PositionsTable from '../PositionsTable'
import Panel from '../../ui/Panel'
import { propTypes, defaultProps } from './PositionsTablePanel.props'

export default class PositionsTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const { currentExchange } = savedState

    this.state = {
      currentExchange,
    }
  }

  render() {
    const { currentExchange } = this.state
    const { onRemove } = this.props

    return (
      <Panel
        label='POSITIONS'
        onRemove={onRemove}
      >
        <PositionsTable
          exID={currentExchange}
        />
      </Panel>
    )
  }
}
