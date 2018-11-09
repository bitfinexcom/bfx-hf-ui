import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import BTHeaderBar from '../../components/BTHeaderBar'
import Chart from '../../components/Chart'
import Panel from '../../ui/Panel'
import './style.css'

export default class AlgoOrdersView extends React.Component {
  state = {
    selectedSymbol: 'tETHUSD',
    selectedTF: '1m',

    // Default to last day
    selectedRange: [new Date(Date.now() - (24 * 60 * 60 * 1000)), new Date()],
  }

  constructor(props) {
    super(props)

    this.onSelectSymbol = this.onSelectSymbol.bind(this)
    this.onSelectTF = this.onSelectTF.bind(this)
    this.onSelectRange = this.onSelectRange.bind(this)
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
    const { allCandles } = this.props
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
          title='No Data For Range'
        />
      )
    }

    return (
      <Chart
        candles={candles}
        trades={[]}
        focusTrade={null}
      />
    )
  }

  render () {
    const { selectedRange, selectedTF, selectedSymbol } = this.state

    return (
      <div className='hfui__wrapper hfui-algo-orders'>
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
            <div className='hfui-order-form'>
              <Panel label='Order Form'>
              </Panel>
            </div>
          </div>

          <div className='hfui-algo-orders__main'>
            <div className='hfui-chart-wrapper'>
              {this.renderChart()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
