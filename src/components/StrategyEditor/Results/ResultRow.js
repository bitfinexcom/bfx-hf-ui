import React from 'react'
import { propTypes, defaultProps } from './ResultRow.props'

export default class ResultRow extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { label, value } = this.props

    return (
      <li>
        <p className='dtc-strategyeditor__results-label'>{label}</p>
        <p className='dtc-strategyeditor__results-value'>{value}</p>
      </li>
    )
  }
}
