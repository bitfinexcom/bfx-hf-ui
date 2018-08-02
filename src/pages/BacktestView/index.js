import React from 'react'
import './index.css'

import BacktestList from '../../components/BacktestList'
import BacktestInfo from '../../components/BacktestInfo'
import BacktestTrades from '../../components/BacktestTrades'
import TradeContext from '../../components/TradeContext'
import Chart from '../../components/Chart'

import HFI from 'bfx-honey-framework/lib/indicators'

const indicatorClassById = _id => Object.values(HFI).find(i => i.id === _id)

// TODO: Extract data manipulation, use redux
export default class BacktestView extends React.Component {
  state = {
    candleData: [],
    tradeData: [],
    btData: [],
  }

  constructor(props) {
    super(props)

    this.onSelectTrade = this.onSelectTrade.bind(this)
    this.onSelectBT = this.onSelectBT.bind(this)
  }

  componentDidMount () {
    const ws = new WebSocket('ws://localhost:8899')

    ws.onopen = () => {
      console.log('HF data server ws open')

      ws.send(JSON.stringify(['get.bt.all']))
      ws.send(JSON.stringify(['get.candle_chunks']))
    }

    ws.onmessage = ({ data }) => {
      const msgJSON = data
      let msg

      try {
        msg = JSON.parse(msgJSON)
      } catch (e) {
        console.error(e)
      }

      const [type, payload = []] = msg

      switch (type) {
        case 'data.candle_chunks': {
          const chunks = payload.sort((a, b) => a.from - b.from)
          const continousChunks = []
          let startChunk = 0
          let lastTo = null

          for (let i = 0; i < chunks.length; i += 1) {
            if (lastTo === null || chunks[i].from === lastTo) {
              lastTo = chunks[i].to
            } else {
              continousChunks.push({
                chunks: chunks.slice(startChunk, i),
                from: chunks[startChunk].from,
                to: chunks[i - 1].to
              })

              startChunk = i
              lastTo = null
            }
          }

          if (lastTo !== null) {
            continousChunks.push({
              chunks: chunks.slice(startChunk),
              from: chunks[startChunk].from,
              to: lastTo
            })
          }

          console.log({ continousChunks })
          break
        }

        case 'data.bt.all': {
          const [ btData = [], btTradeData, btCandleData ] = payload
          let activeBT = (btData.sort((a, b) => b.id - a.id) || [])[0] || null
          let indicators = []

          // TODO: Extract, computes indicator values
          if (activeBT) {
            const indicatorModels = []

            indicators = activeBT.indicators
            indicators.forEach((i = {}) => {
              const { id, key } = i
              const IClass = indicatorClassById(id)

              if (IClass) {
                indicatorModels.push({
                  i: new IClass(i.args),
                  key,
                })
              }
            })

            // Very basic, attach indicator values to candles
            btCandleData.forEach(({ c }) => {
              indicatorModels.forEach(m => {
                m.i.add(c.close)
                c[m.key] = m.i.v()
              })
            })
          }

          this.setState({
            indicators,
            activeBT, // Removes the need for a list, for now
            btData,
            tradeData: btTradeData,
            candleData: btCandleData,
            dataMTS: Date.now()
          })

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

  onSelectBT (activeBT) {
    this.setState(() => ({ activeBT }))
  }

  render () {
    const {
      candleData, selectedTrade, dataMTS, indicators, activeBT, btData
    } = this.state

    const { trades } = (activeBT || {})

    return (
      <div className='hfui__wrapper'>
        <div className='hfui__sidebar'>
          <BacktestList
            bts={btData}
            onSelect={this.onSelectBT}
          />

          <BacktestInfo
            candles={candleData}
            trades={trades}
            bt={activeBT}
          />

          {selectedTrade && <TradeContext trade={selectedTrade} />}
        </div>

        <div className='hfui__content'>
          <Chart
            candles={candleData}
            trades={trades}
            focusTrade={selectedTrade}
            dataMTS={dataMTS}
            indicators={indicators}
          />

          <BacktestTrades
            trades={trades}
            onSelect={this.onSelectTrade}
          />
        </div>
      </div>
    )
  }
}
