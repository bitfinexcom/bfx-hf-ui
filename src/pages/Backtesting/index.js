import React from 'react'
import HFI from 'bfx-honey-framework/lib/indicators'

import BTHeaderBar from '../../components/BTHeaderBar'
import BTHistoricalView from './BTHistoricalView'
import BTNewView from './BTNewView'

export default class BacktestingView extends React.Component {
  state = {
    selectedSymbol: 'tBTCUSD',
    selectedTF: '1m',
    selectedMode: 'new',
    selectedRange: [null, null],
  }

  constructor(props) {
    super(props)

    this.onSelectTrade = this.onSelectTrade.bind(this)
    this.onSelectBT = this.onSelectBT.bind(this)

    this.onSelectSymbol = this.onSelectSymbol.bind(this)
    this.onSelectTF = this.onSelectTF.bind(this)
    this.onSelectMode = this.onSelectMode.bind(this)
    this.onSelectRange = this.onSelectRange.bind(this)
  }

  onSelectSymbol (selectedSymbol) {
    this.setState(() => ({ selectedSymbol }))
  }

  onSelectTF (selectedTF) {
    this.setState(() => ({ selectedTF }))
  }

  onSelectMode (selectedMode) {
    this.setState(() => ({ selectedMode }))
  }

  onSelectRange (selectedRange) {
    this.setState(() => ({ selectedRange }))
  }

  componentDidMount () {
    /*
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
                const dt = m.i.getDataType()
                const dk = m.i.getDataKey()

                if (dt === '*' || dt === 'candle') {
                  m.i.add(dk === '*' ? c : c[dk])
                  c[m.key] = m.i.v()
                } else {
                  c[m.key] = 0
                }
              })
            })

            console.log(indicatorModels)
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
    */
  }

  onSelectTrade (selectedTrade) {
    this.setState(() => ({ selectedTrade }))
  }

  onSelectBT (activeBT) {
    this.setState(() => ({ activeBT }))
  }

  render () {
    const {
      selectedSymbol,
      selectedTF,
      selectedMode,
      selectedRange,
    } = this.state

    // TODO: Remove
    const {
      candleData, selectedTrade, dataMTS, indicators, activeBT, btData
    } = this.state

    return [
      <div key='btheaderbar'>
        <BTHeaderBar
          selectedSymbol={selectedSymbol}
          selectedTF={selectedTF}
          selectedMode={selectedMode}
          selectedRange={selectedRange}

          onSelectMarket={this.onSelectMarket}
          onSelectTF={this.onSelectTF}
          onSelectMode={this.onSelectMode}
          onSelectRange={this.onSelectRange}
        />
      </div>
    ,
      <div className='hfui__wrapper' key='btwrapper'>
        {selectedMode === 'new' ? (
          <BTNewView
            symbol={selectedSymbol}
            range={selectedRange}
            tf={selectedTF}
          />
        ) : (
          <BTHistoricalView />
        )}
      </div>
    ]
  }
}
