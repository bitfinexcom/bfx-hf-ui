import React from 'react'

import StrategyEditor from '../../components/StrategyEditor'
import StrategyTradesTable from '../../components/StrategyTradesTable'
import Chart from '../../components/Chart'
import StatusBar from '../../components/StatusBar'
import { calcIndicatorValuesForCandles } from '../../components/Chart/helpers'
import { propTypes, defaultProps } from './StrategyEditor.props'
import './style.css'

export default class StrategyEditorPage extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    results: {},
    indicators: [],
    indicatorData: {},
    currentRange: [],
    tf: '1m',
    focusMTS: null,
  }

  constructor(props) {
    super(props)

    this.onResultsChange = this.onResultsChange.bind(this)
    this.onIndicatorsChange = this.onIndicatorsChange.bind(this)
    this.onCurrentRangeChange = this.onCurrentRangeChange.bind(this)
    this.onTradeClick = this.onTradeClick.bind(this)
    this.onCurrentTFChange = this.onCurrentTFChange.bind(this)
  }

  onResultsChange(results) {
    this.setState(() => ({ results }))
  }

  onCurrentRangeChange(currentRange) {
    this.setState(() => ({ currentRange }))
  }

  onIndicatorsChange(indicators) {
    const { candleData, activeMarket, activeExchange } = this.props
    const { currentRange, tf } = this.state
    const candleKey = `${tf}:${activeMarket.u}`
    const start = +currentRange[0]

    const allCandles = Object.values((candleData[activeExchange] || {})[candleKey] || {})
    const candles = allCandles.filter(({ mts }) => mts >= start)
    candles.sort((a, b) => a.mts - b.mts)

    const indicatorData = {}

    Object.values(indicators).forEach((i) => {
      indicatorData[i.key] = calcIndicatorValuesForCandles(i, candles)
    })

    this.setState(() => ({
      tf,
      indicators,
      indicatorData,
    }))
  }

  onCurrentTFChange(tf) {
    this.setState(() => ({ tf }))

    setTimeout(() => {
      const { indicators } = this.state
      this.onIndicatorsChange(indicators)
    }, 0)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { candleData, activeMarket, activeExchange } = nextProps
    const { currentRange, tf, indicators } = prevState

    if (indicators.length === 0) {
      return {}
    }

    const candleKey = `${tf}:${activeMarket.u}`
    const start = +currentRange[0]

    const allCandles = Object.values((candleData[activeExchange] || {})[candleKey] || {})
    const candles = allCandles.filter(({ mts }) => mts >= start)
    candles.sort((a, b) => a.mts - b.mts)

    const indicatorData = {}

    Object.values(indicators).forEach((i) => {
      indicatorData[i.key] = calcIndicatorValuesForCandles(i, candles)
    })

    return { indicatorData }
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
      results = {}, indicators, indicatorData, focusMTS, tf,
    } = this.state
    const { trades = [] } = results

    return (
      <div className='hfui-strategyeditorpage__wrapper'>
        <StrategyEditor
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
          <Chart
            showIndicatorControls={false}
            showOrders={false}
            showPositions={false}
            activeMarket={activeMarket}
            activeExchange={activeExchange}
            indicators={Object.values(indicators)}
            indicatorData={indicatorData}
            trades={trades}
            focusMTS={focusMTS}
            moveable={false}
            removeable={false}
            canChangeMarket={false}
            canChangeExchange={false}
            showMarket={false}
            showExchange={false}
            disableIndicatorSettings

            onRangeChange={this.onCurrentRangeChange}
            onTFChange={this.onCurrentTFChange}
          />

          <StrategyTradesTable
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
