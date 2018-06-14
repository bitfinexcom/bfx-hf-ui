import React from 'react'
import './hfui.css'

import BacktestInfo from './components/BacktestInfo'
import BacktestTrades from './components/BacktestTrades'
import Chart from './components/Chart'
import Navbar from './ui/Navbar'

import {
  Route
} from 'react-router-dom'

// TODO: Extract data manipulation, use redux
export default class HFUI extends React.Component {
  state = {
    candleData: [],
    tradeData: [],
    stratTradeData: [],
    dataMTS: null
  }

  constructor(props) {
    super(props)
    this.onSelectTrade = this.onSelectTrade.bind(this)
  }

  componentDidMount () {
    const ws = new WebSocket('ws://localhost:8899')
    let btCandleData = []
    let btTradeData = []
    let btStrategyTradeData = []

    ws.onopen = () => {
      console.log('HF data server ws open')

      ws.send(JSON.stringify(['bt.results']))
      ws.send(JSON.stringify(['sub', 'bt.results']))
    }

    ws.onmessage = ({ data }) => {
      const msgJSON = data
      let msg

      try {
        msg = JSON.parse(msgJSON)
      } catch (e) {
        console.error(e)
      }

      const [type, payload = {}] = msg

      switch (type) {
        case 'bt.start': {
          btCandleData = []
          btTradeData = []
          btStrategyTradeData = []
          break
        }

        case 'bt.candle': {
          btCandleData.push(payload)
          break
        }

        case 'bt.candles': {
          btCandleData = [
            ...btCandleData,
            ...payload
          ]
          break
        }

        case 'bt.trade': {
          btTradeData.push(payload)
          break
        }

        case 'bt.trades': {
          btTradeData = [
            ...btTradeData,
            ...payload
          ]
          break
        }

        case 'bt.strat.trade': {
          btStrategyTradeData.push(payload)
          break
        }

        case 'bt.strat.trades': {
          btStrategyTradeData = [
            ...btStrategyTradeData,
            ...payload
          ]
          break
        }

        case 'bt.end': {
          this.setState(() => ({
            candleData: btCandleData,
            tradeData: btTradeData,
            stratTradeData: btStrategyTradeData,
            dataMTS: Date.now()
          }))
          break
        }

        default: {
          console.warn('unrecognised message type: ', type)
        }
      }
    }
  }

  onSelectTrade (selectedTrade) {
    this.setState(() => ({ selectedTrade }))
  }

  render () {
    const { candleData, stratTradeData, selectedTrade, dataMTS } = this.state

    return (
      <div>
        <Route component={Navbar} />

        <div className='hfui__wrapper'>
          <div className='hfui__sidebar'>
            <BacktestInfo candles={candleData} trades={stratTradeData} />
          </div>

          <div className='hfui__content'>
            <Chart
              candles={candleData}
              trades={stratTradeData}
              focusTrade={selectedTrade}
              dataMTS={dataMTS}
            />

            <BacktestTrades
              trades={stratTradeData}
              onSelectTrade={this.onSelectTrade}
            />
          </div>
        </div>
      </div>
    )
  }
}
