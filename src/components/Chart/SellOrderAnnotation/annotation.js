import {
  default as LabelAnnotation, helper
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'
import CaretDownIcon from '../../../ui/Icons/CaretDownIcon'
import { labelForStrategyTradeAnnotation } from '../Chart.helpers'

/**
 * Renders multiple caret-down icons, one for each order within the current candle
 * specified via 'datum'
 */
export default class SellOrder extends LabelAnnotation {
  static propTypes = LabelAnnotation.propTypes
  static defaultProps = LabelAnnotation.defaultProps

  render () {
    const { xAccessor, xScale, yScale, className, opacity, mtsMap, datum } = this.props
    const { xPos, fill } = helper(this.props, xAccessor, xScale, yScale)
    const orders = mtsMap[datum.mts]

    return orders.map(o => (
      <g className={className} key={o.trade.mts}>
        <title>{labelForStrategyTradeAnnotation(o)}</title>
        <CaretDownIcon
          x={xPos}
          y={yScale(o.trade.price)}
          fill={fill}
          opacity={opacity}
          onClick={this.handleClick}
        />
      </g>
    ))
  }
}
