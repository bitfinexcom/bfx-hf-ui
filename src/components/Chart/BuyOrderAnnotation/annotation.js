import {
  default as LabelAnnotation, helper
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'
import CaretUpIcon from '../../../ui/Icons/CaretUpIcon'

export default class BuyOrder extends LabelAnnotation {
  render () {
    const { xAccessor, xScale, yScale, className, opacity, rotate } = this.props
    const { xPos, yPos, fill, tooltip } = helper(this.props, xAccessor, xScale, yScale)

    return (
      <g className={className}>
        <title>{tooltip}</title>
        <CaretUpIcon
          x={xPos}
          y={yPos}
          fill={fill}
          opacity={opacity}
          onClick={this.handleClick}
        />
      </g>
    )
  }
}
