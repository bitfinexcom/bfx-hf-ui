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
