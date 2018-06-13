import {
  default as LabelAnnotation, helper
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'
import CaretDownIcon from '../../../ui/Icons/CaretDownIcon'

export default class SellOrder extends LabelAnnotation {
  render () {
    const { xAccessor, xScale, yScale, className, opacity } = this.props
    const { xPos, yPos, fill, tooltip } = helper(this.props, xAccessor, xScale, yScale)

    return (
      <g className={className}>
        <title>{tooltip}</title>
        <CaretDownIcon
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
