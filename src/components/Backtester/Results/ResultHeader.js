import React from 'react'
import { propTypes, defaultProps } from './ResultRow.props'

export default class ResultHeader extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { label, value } = this.props

    return (
      <div className='hfui-strategyeditor__results-header-item'>
        <div className='hfui-strategyeditor__results-header-item_wrapper'>
          <p>{label}</p>
          <h4><b>{value}</b></h4>
        </div>
      </div>
    )
  }
}
