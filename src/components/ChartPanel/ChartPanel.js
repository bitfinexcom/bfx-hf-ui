import React from 'react'
import Chart from '../Chart'
import Panel from '../../ui/Panel'

import { propTypes, defaultProps } from './ChartPanel.props'

export default class ChartPanel extends React.Component {
    static propTypes = propTypes
    static defaultProps = defaultProps
    state = {}
    render() {
      const {
        onRemove, moveable, removeable, dark,
      } = this.props
      return (
        <Panel
          dark={dark}
          darkHeader={dark}
          onRemove={onRemove}
          moveable={moveable}
          removeable={removeable}
        >
          <Chart />
        </Panel>
      )
    }
}
