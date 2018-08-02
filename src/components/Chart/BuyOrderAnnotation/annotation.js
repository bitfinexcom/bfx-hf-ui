import {
  default as LabelAnnotation, helper
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'
import CaretUpIcon from '../../../ui/Icons/CaretUpIcon'
import { labelForStrategyTradeAnnotation } from '../Chart.helpers'

/**
 * Renders multiple caret-up icons, one for each order within the current candle
 * specified via 'datum'
 */
export default class BuyOrder extends LabelAnnotation {
  static propTypes = LabelAnnotation.propTypes
  static defaultProps = LabelAnnotation.defaultProps

  render () {
    const {
      xAccessor, xScale, yScale, className, opacity, mtsMap, datum
    } = this.props
    const { xPos, fill } = helper(this.props, xAccessor, xScale, yScale)
    const orders = mtsMap[datum.mts]

    return orders.map(o => (
      <g className={className} key={o.mts}>
        <title>{labelForStrategyTradeAnnotation(o)}</title>
        <CaretUpIcon
          x={xPos}
          y={yScale(o.price)}
          fill={fill}
          opacity={opacity}
          onClick={this.handleClick}
        />
      </g>
    ))
  }
}
