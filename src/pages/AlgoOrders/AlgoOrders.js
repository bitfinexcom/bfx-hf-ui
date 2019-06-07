import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import { TIME_FRAME_WIDTHS } from 'bfx-hf-util'

import BTHeaderBar from '../../components/BTHeaderBar'
import AlgoOrderTable from '../../components/AlgoOrderTable'
import SingleAlgoOrderDetails from '../../components/SingleAlgoOrderDetails'
import Chart from '../../components/Chart'

export default class AlgoOrdersView extends React.Component {
  state = {
    selectedAO: null,
    selectedSymbol: 'tBTCUSD',
    selectedTF: '1m',

    // Default to last day
    selectedRange: [new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), new Date()],
  }

  constructor(props) {
    super(props)

    this.onSelectSymbol = this.onSelectSymbol.bind(this)
    this.onSelectTF = this.onSelectTF.bind(this)
    this.onSelectRange = this.onSelectRange.bind(this)
    this.onSelectAO = this.onSelectAO.bind(this)
    this.onLoadMoreCandles = this.onLoadMoreCandles.bind(this)
  }

  componentDidMount() {
    this.handleSync()
  }

  onSelectAO (selectedAO) {
    this.setState(() => ({ selectedAO }))
  }

  onSelectSymbol (selectedSymbol) {
    this.setState(() => ({ selectedSymbol }))
  }

  onSelectTF(selectedTF) {
    this.setState(() => ({ selectedTF }))
  }

  onSelectRange(selectedRange) {
    this.setState(() => ({ selectedRange }))
  }

  onLoadMoreCandles (count) {
    const { syncCandles } = this.props
    const { selectedTF, selectedSymbol, selectedRange } = this.state
    const cWidth = TIME_FRAME_WIDTHS[selectedTF]

    if (!cWidth) {
      return
    }

    const syncRange = [
      new Date(selectedRange[0] - (cWidth * count * 2)),
      selectedRange[0]
    ]

    const newRange = [
      new Date(selectedRange[0] - (cWidth * count * 2)),
      selectedRange[1]
    ]

    this.setState(() => ({ selectedRange: newRange }))
    syncCandles(selectedSymbol, selectedTF, syncRange)
  }

  handleSync () {
    const { syncCandles } = this.props
    const { selectedSymbol, selectedRange, selectedTF } = this.state
    const [from, to] = selectedRange

    // Incomplete/invalid range
    if (from === null || to === null || (+from) > (+to)) {
      return
    }

    syncCandles(selectedSymbol, selectedTF, selectedRange)
  }

  renderChart () {
    const { allCandles, orders } = this.props
    const { selectedTF, selectedSymbol, selectedRange } = this.state
    const [from, to] = selectedRange

    if (from === null || to === null) {
      return (
        <NonIdealState
          title='No Range Selected'
          icon='series-derived'
        />
      )
    }

    // TODO: Optimize, extract from render path
    const candleData = allCandles[`${selectedSymbol}:trade:${selectedTF}`] || {}
    const candles = Object
      .keys(candleData)
      .sort((a, b) => a - b)
      .map(mts => ({
        date: new Date(+mts),
        volume: candleData[mts].vol,
        ...candleData[mts],
      }))

    if (candles.length === 0) {
      return (
        <NonIdealState
          title='Loading Candles...'
        />
      )
    }

    return (
      <Chart
        onLoadMore={this.onLoadMoreCandles}
        orders={orders.filter(o => o[3] === selectedSymbol)}
        candles={candles}
        trades={[]}
        focusTrade={null}
      />
    )
  }

  render () {
    const { algoOrders, orders } = this.props
    const { selectedRange, selectedTF, selectedSymbol, selectedAO } = this.state

    return (
      <div className='hfui_view__wrapper hfui-algo-orders'>
        <BTHeaderBar
          selectedSymbol={selectedSymbol}
          selectedTF={selectedTF}
          selectedRange={selectedRange}

          onSelectSymbol={this.onSelectSymbol}
          onSelectTF={this.onSelectTF}
          onSelectRange={this.onSelectRange}
        />

        <div className='hfui-algo-orders__content'>
          <div className='hfui-sidebar'>
          </div>

          <div className='hfui-algo-orders__main'>
            <div className='hfui-chart-wrapper'>
              {this.renderChart()}
            </div>

            <AlgoOrderTable
              onSelect={this.onSelectAO}
              algoOrders={algoOrders}
              orders={orders}
            />

            {selectedAO && (
              <SingleAlgoOrderDetails
                ao={selectedAO}
                orders={orders}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
