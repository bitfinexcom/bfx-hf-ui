import React from 'react'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './ExchangeInfoBarItem.props'

export default class ExchangeInfoBarItem extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      label, value, valuePrefix, valueSuffix, dataClassName, labelClassName,
      text, vertical,
    } = this.props

    return (
      <li className={ClassNames('hfui-exchangeinfobar__item', { text, vertical })}>
        <p
          className={ClassNames('hfui-exchangeinfobar__item-label', labelClassName)}
        >
          {label}
        </p>

        <div
          className={ClassNames('hfui-exchangeinfobar__item-data', dataClassName)}
        >
          {valuePrefix}
          {typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 8 }) : value}
          {valueSuffix}
        </div>
      </li>
    )
  }
}
