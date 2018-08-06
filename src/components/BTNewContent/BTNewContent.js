import React from 'react'
import Chart from '../Chart'
import candleWidth from 'bfx-honey-framework/lib/util/candles/width'

export default class BTNewContent extends React.PureComponent {
  componentDidMount () {
    this.handleSync()
  }

  componentDidUpdate (prevProps) {
    const { symbol, range, tf } = prevProps

    if (
      (symbol !== this.props.symbol) ||
      (tf !== this.props.tf) ||
      (range[0] !== this.props.range[0]) ||
      (range[1] !== this.props.range[1])
    ) {
      this.handleSync()
    }
  }

  handleSync () {
    const { candles, symbol, range, tf, syncCandles } = this.props
    const [ from, to ] = range

    // Incomplete/invalid range
    if (from === null || to === null || (+from) > (+to)) {
      return
    }

    const nCandles = Math.floor(((+to) - (+from)) / candleWidth(tf))

    console.log({ from, to, nCandles })

    if (nCandles !== candles.length) {
      console.warn(`have incomplete candles: ${nCandles} !== ${candles.length} (${symbol}, ${tf})`)

      syncCandles(symbol, tf, range)
    }
  }

  render () {
    const { range, symbol, tf, candles } = this.props
    const [ from, to ] = range

    if (from === null || to === null) {
      return <h1>incomplete range</h1>
    } else if (candles.lenth === 0) {
      return <h1>no data</h1>
    }

    return (
      <div className='hfui__content'>
        <Chart
          candles={candles}
          trades={[]}
          focusTrade={null}
          dataKey={`${symbol}:${tf}:${+from}:${+to}`}
          indicators={[]}
        />
      </div>
    )
  }
}
