import React from 'react'
import PropTypes from 'prop-types'
import { Annotate } from 'react-stockcharts/lib/annotation'

import Annotation from './annotation'

export default class EventAnnotation extends React.Component {
  static propTypes = {
    when: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    yOffset: PropTypes.number.isRequired,
    stroke: PropTypes.string
  }

  static defaultProps = {
    stroke: '#FFFFFF'
  }

  render () {
    const { when, height, yOffset, stroke } = this.props

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
          y: ({ datum, yScale }) => {
            return yScale(datum.high)
          },
        }}
      />
    )
  }
}
