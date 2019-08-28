import {
  default as LabelAnnotation, helper,
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'
import CaretDownIcon from '../../../ui/Icons/CaretDownIcon'
import { labelForStrategyTradeAnnotation } from '../helpers'

export default class SellOrder extends LabelAnnotation {
  static propTypes = LabelAnnotation.propTypes
  static defaultProps = LabelAnnotation.defaultProps

  render() {
    const {
      xAccessor, xScale, yScale, className, opacity, mtsMap, datum,
    } = this.props
    const { xPos, fill } = helper(this.props, xAccessor, xScale, yScale)
    const orders = mtsMap[datum.mts]

    return orders.map(o => (
      <g className={className} key={o.order_id}>
        <title>{labelForStrategyTradeAnnotation(o)}</title>
        <CaretDownIcon
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
