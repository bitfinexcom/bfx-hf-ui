import React from 'react'
import { Annotate } from 'react-stockcharts/lib/annotation'
import { timeFormat } from 'd3-time-format'

import Annotation from './annotation'
import tradeCandleMTSMap from '../../../util/trade_candle_mts_map'

export default class SellOrderAnnotation extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      mtsMap: tradeCandleMTSMap(props.trades, props.candles)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { trades, candles } = nextProps

    if (trades !== this.props.trades || candles !== this.props.candles) {
      this.setState(() => ({
        mtsMap: tradeCandleMTSMap(trades, candles)
      }))
    }
  }

  render () {
    const { mtsMap } = this.state

    return (
      <Annotate
        with={Annotation}
        when={d => !!mtsMap[+d.date]}
        usingProps={{
          fontSize: 36,
          fontFamily: 'Glyphicons Halflings',
          fill: '#FF0000',
          opacity: 0.8,
          text: '\u2191',
          tooltip: d => timeFormat('%B')(d.date),
          x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
          y: ({ datum, yScale }) => {
            const { mts } = datum
            const trade = trades.find(t => t.mts === mts)

            return yScale(datum.high)
          },
        }}
      />
    )
  }
}
