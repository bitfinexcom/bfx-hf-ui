import React from 'react'
import ClassNames from 'classnames'

export default class BacktestInfoRow extends React.PureComponent {
  render() {
    const { className, label, value } = this.props

    return (
      <li className={ClassNames('btinfo-row', className)}>
        <p className='btinfo-row__label'>{label}</p>
        <p className='btinfo-row__value'>{value}</p>
      </li>
    )
  }
}
