import LabelAnnotation, {
  helper,
} from 'react-stockcharts/lib/annotation/LabelAnnotation'

import React from 'react'

export default class Event extends LabelAnnotation {
  static propTypes = LabelAnnotation.propTypes
  static defaultProps = LabelAnnotation.defaultProps

  render() {
    const {
      xAccessor, xScale, yScale, className, opacity, label, height, yOffset,
      stroke,
    } = this.props

    const { xPos } = helper(this.props, xAccessor, xScale, yScale)

    return (
      <g className={className}>
        <title>{label}</title>

        <line
          stroke={stroke}
          opacity={opacity}
          onClick={this.handleClick}

          x1={xPos}
          x2={xPos}
          y1={yOffset}
          y2={yOffset + height}
        />
      </g>
    )
  }
}
