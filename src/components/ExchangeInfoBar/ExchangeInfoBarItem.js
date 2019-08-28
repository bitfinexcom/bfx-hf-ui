import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './ExchangeInfoBarItem.props'

export default class ExchangeInfoBarItem extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const {
      label, value, valuePrefix, valueSuffix, dataClassName, labelClassName,
      text,
    } = this.props

    return (
      <li className={ClassNames({ text })}>
        <p
          className={ClassNames('dtc-exchangeinfobar__item-label', labelClassName)}
        >{label}</p>

        <div
          className={ClassNames('dtc-exchangeinfobar__item-data', dataClassName)}
        >
          {valuePrefix}
          {typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 8 }) : value}
          {valueSuffix}
        </div>
      </li>
    )
  }
}