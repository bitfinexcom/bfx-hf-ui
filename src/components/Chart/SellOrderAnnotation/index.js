import React from 'react'
import { Annotate } from 'react-stockcharts/lib/annotation'
import { timeFormat } from 'd3-time-format'
import _isArray from 'lodash/isArray'

import { propTypes, defaultProps } from './props'
import Annotation from './annotation'
import tradeCandleMTSMap from '../../../util/trade_candle_mts_map'

/**
 * Renders sell order entry icons based on a list of candles & strategy
 * trades/orders. An internal map of candle timestamps is updated when the
 * dataset changes.
 *
 * TODO: Refactor out UNSAFE_*
 */
export default class SellOrderAnnotation extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = {
      mtsMap: this.getMTSMap(props),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    const { trades, candles } = this.props

    if (trades !== nextProps.trades || candles !== nextProps.candles) {
      this.setState(() => ({
        mtsMap: this.getMTSMap(nextProps),
      }))
    }
  }

  getMTSMap(props = this.props) {
    const { candles } = props
    const trades = props.trades.filter(({ amount }) => amount < 0)

    return tradeCandleMTSMap(trades, candles)
  }

  render() {
    const { mtsMap } = this.state

    return (
      <Annotate
        with={Annotation}
        when={d => _isArray(mtsMap[d.mts])}
        usingProps={{
          mtsMap,
          fontSize: 36,
          fontFamily: 'Glyphicons Halflings',
          fill: '#FF0000',
          opacity: 0.8,
          text: '\u2191',
          tooltip: d => timeFormat('%B')(new Date(d.mts)),
          x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
          y: ({ datum, yScale }) => yScale(datum.high),
        }}
      />
    )
  }
}
