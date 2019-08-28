import React from 'react'

export default class ResultRow extends React.PureComponent {
  render () {
    const { label, value } = this.props

    return (
      <li>
        <p className='dtc-strategyeditor__results-label'>{label}</p>
        <p className='dtc-strategyeditor__results-value'>{value}</p>
      </li>
    )
  }
}
