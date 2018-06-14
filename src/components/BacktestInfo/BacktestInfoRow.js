import React from 'react'

export default class BacktestInfoRow extends React.PureComponent {
  render () {
    const { label, value } = this.props

    return (
      <li className='btinfo-row'>
        <p className='btinfo-row__label'>{label}</p>
        <p className='btinfo-row__value'>{value}</p>
      </li>
    )
  }
}
