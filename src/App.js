import React from 'react'
import './App.css'

import Status from './components/Status'
import StrategyTrades from './components/StrategyTrades'
import Chart from './components/Chart'

import mockCandleData from './util/mock_candle_data.json'

// TODO: Extract data manipulation, use redux
export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      candleData: [],
      tradeData: [],
      stratTradeData: []
    }
  }

  componentDidMount () {
    const ws = new WebSocket('ws://localhost:8899')
    let btCandleData = []
    let btTradeData = []
    let btStrategyTradeData = []

    ws.onopen = () => {
      console.log('HF data server ws open')

      ws.send(JSON.stringify(['bt.results']))
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

        case 'bt.trade': {
          btTradeData.push(payload)
          break
        }

        case 'bt.strat.trade': {
          btStrategyTradeData.push(payload)
          break
        }

        case 'bt.end': {
          this.setState(() => ({
            candleData: btCandleData,
            tradeData: btTradeData,
            stratTradeData: btStrategyTradeData
          }))
          break
        }

        default: {
          console.warn('unrecognised message type: ', type)
        }
      }
    }
  }

  render () {
    const { candleData, stratTradeData } = this.state

    return (
      <div className='pt-dark'>
        <div className='pt-navbar'>
          <div className='pt-navbar-group pt-align-left'>
            <div className='pt-navbar-header'>Honey Framework UI</div>
          </div>

          <div className='pt-navbar-group pt-align-right'>
            <button className='pt-button pt-minimal pt-icon-home pt-active'>Overview</button>
            <button className='pt-button pt-minimal pt-icon-function'>Algo Orders</button>
            <button className='pt-button pt-minimal pt-icon-play'>Execution</button>
            <button className='pt-button pt-minimal pt-icon-series-derived'>Backtesting</button>
            <button className='pt-button pt-minimal pt-icon-cog'>Settings</button>
          </div>
        </div>

        <br />

        <div className='hfui__wrapper'>
          <div className='hfui__sidebar'>
            <Status />
          </div>

          <div className='hfui__content'>
            <Chart candles={candleData} trades={stratTradeData} />
            <StrategyTrades trades={stratTradeData} />
          </div>
        </div>
      </div>
    )
  }
}
