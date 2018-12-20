import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import { TIME_FRAME_WIDTHS } from 'bfx-hf-util'

import OrderForm from 'bfx-ui-components/dist/OrderForm'
import TickerList from 'bfx-ui-components/dist/TickerList'
import MainTicker from 'bfx-ui-components/dist/MainTicker'
import Balances from 'bfx-ui-components/dist/Balances'
import Summary from 'bfx-ui-components/dist/Summary'
import Positions from 'bfx-ui-components/dist/Positions'
import Orders from 'bfx-ui-components/dist/Orders'
import OrderHistory from 'bfx-ui-components/dist/OrderHistory'

import Chart from '../../components/Chart'
import './style.css'

export default class AlgoOrdersView extends React.Component {
  state = {
    // Default to last day
    selectedRange: [new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)), new Date()],
    selectedSymbol: 'tBTCUSD',
    selectedTF: '1m',
  }

  constructor(props) {
    super(props)

    this.onSelectSymbol = this.onSelectSymbol.bind(this)
    this.onSelectTF = this.onSelectTF.bind(this)
    this.onSelectRange = this.onSelectRange.bind(this)
    this.onLoadMoreCandles = this.onLoadMoreCandles.bind(this)
  }

  componentDidMount () {
    this.handleSync()
  }

  onSelectSymbol (selectedSymbol) {
    this.setState(() => ({ selectedSymbol }))
  }

  onSelectTF (selectedTF) {
    this.setState(() => ({ selectedTF }))
  }

  onSelectRange (selectedRange) {
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
    const [ from, to ] = selectedRange

    // Incomplete/invalid range
    if (from === null || to === null || (+from) > (+to)) {
      return
    }

    syncCandles(selectedSymbol, selectedTF, selectedRange)
  }

  renderChart () {
    const { allCandles, orders } = this.props
    const { selectedTF, selectedSymbol, selectedRange } = this.state
    const [ from, to ] = selectedRange

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
        ...candleData[mts]
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
    return (
      <div className='hfui__wrapper hfui-trading'>
        <div id='sidebar' className='hfui-trading__sidebar'>
          <div className='hfui-trading__main-ticker'>
            <MainTicker
              symbol='BTCUSD'
              canUpdateTitle={false}
            />
          </div>

          <div className='hfui-trading__tickers'>
            <TickerList
              isTrading={true}
              isFunding={false}
            />
          </div>

          <div className='hfui-trading__order-form'>
            <OrderForm />
          </div>

          <div className='hfui-trading__balances'>
            <Balances
              pair='tBTCUSD'
              ccy=''
              isTrading={true}
              isFunding={false}
            />
          </div>

          <div className='hfui-trading__summary'>
            <Summary
              pair='tBTCUSD'
              ccy=''
            />
          </div>
        </div>

        <div className='hfui-trading__content'>
          <div className='hfui-chart-wrapper'>
            {this.renderChart()}
          </div>

          <div className='hfui-trading__positions'>
            <Positions />
          </div>

          <div className='hfui-trading__orders'>
            <Orders pair='tBTCUSD' />
          </div>

          <div className='hfui-trading__order-history'>
            <OrderHistory pair='tBTCUSD' />
          </div>
        </div>
      </div>
    )
  }
}
