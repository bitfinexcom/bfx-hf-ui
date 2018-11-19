import React from 'react'

import BTHeaderBar from '../../components/BTHeaderBar'
import BTHistoricalView from './BTHistoricalView'
import BTNewView from './BTNewView'

export default class BacktestingView extends React.Component {
  state = {
    selectedSymbol: 'tBTCUSD',
    selectedTF: '1m',
    selectedMode: 'new',

    // Default to last day
    selectedRange: [new Date(Date.now() - (24 * 60 * 60 * 1000)), new Date()],
  }

  constructor (props) {
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

    return [
      <div key='btheaderbar'>
        <BTHeaderBar
          selectedSymbol={selectedSymbol}
          selectedTF={selectedTF}
          selectedMode={selectedMode}
          selectedRange={selectedRange}

          onSelectSymbol={this.onSelectSymbol}
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
