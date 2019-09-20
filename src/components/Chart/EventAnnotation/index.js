import React from 'react'
import { Annotate } from 'react-stockcharts/lib/annotation'

import { propTypes, defaultProps } from './props'
import Annotation from './annotation'

export default class EventAnnotation extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      when, height, yOffset, stroke,
    } = this.props

    return (
      <Annotate
        with={Annotation}
        when={when}
        usingProps={{
          height,
          yOffset,
          stroke,
          opacity: 0.8,
          x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
          y: ({ datum, yScale }) => yScale(datum.high),
        }}
      />
    )
  }
}
