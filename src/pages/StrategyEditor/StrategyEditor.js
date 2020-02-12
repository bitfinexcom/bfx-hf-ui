import React from 'react'
import randomColor from 'randomcolor'

import StrategyEditor from '../../components/StrategyEditor'
import StrategyTradesTable from '../../components/StrategyTradesTable'
import Chart from '../../components/Chart'
import StatusBar from '../../components/StatusBar'
import { propTypes, defaultProps } from './StrategyEditor.props'
import './style.css'

export default class StrategyEditorPage extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    results: {},
    indicators: [],
    tf: '1m',
    focusMTS: null,
  }

  constructor(props) {
    super(props)

    this.onResultsChange = this.onResultsChange.bind(this)
    this.onIndicatorsChange = this.onIndicatorsChange.bind(this)
    this.onTradeClick = this.onTradeClick.bind(this)
    this.onTFChange = this.onTFChange.bind(this)
  }

  onResultsChange(results) {
    this.setState(() => ({ results }))
  }

  onIndicatorsChange(indicators) {
    // TODO: Better color generation; to save time we generate enough colors for
    //       all indicators here, but optimally we'd switch on i.constructor.ui
    this.setState(() => ({
      indicators: Object.values(indicators).map((ind) => {
        let colors = []

        for (let i = 0; i < 5; i += 1) {
          colors.push(randomColor())
        }

        // allow users to overwrite colors
        if (ind.color) {
          colors[0] = ind.color
        } else if (ind.colors) {
          colors = ind.colors // eslint-disable-line
        }

        return [ind.constructor, ind._args, colors]
      }),
    }))
  }

  onTFChange(tf) {
    this.setState(() => ({ tf }))
  }

  onTradeClick(trade) {
    const { mts } = trade

    this.setState(() => ({
      focusMTS: mts,
    }))
  }

  render() {
    const { activeExchange, activeMarket } = this.props
    const {
      results = {}, indicators, focusMTS, tf,
    } = this.state

    const { trades = [] } = results

    return (
      <div className='hfui-strategyeditorpage__wrapper'>
        <StrategyEditor
          dark
          key='editor'
          onResultsChange={this.onResultsChange}
          onIndicatorsChange={this.onIndicatorsChange}
          moveable={false}
          removeable={false}
          tf={tf}
        />

        <div
          key='main'
          className='hfui-strategiespage__right'
        >
          <div className='hfui-strategiespage__chart'>
            <Chart
              dark
              showIndicatorControls={false}
              showOrders={false}
              showPositions={false}
              activeMarket={activeMarket}
              activeExchange={activeExchange}
              indicators={indicators}
              trades={trades}
              focusMTS={focusMTS}
              moveable={false}
              removeable={false}
              canChangeMarket={false}
              canChangeExchange={false}
              showMarket={false}
              showExchange={false}
              disableIndicatorSettings
              disableIndicators
              disableToolbar

              onTFChange={this.onTFChange}
            />
          </div>

          <StrategyTradesTable
            dark
            trades={trades}
            onTradeClick={this.onTradeClick}
          />
        </div>

        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
