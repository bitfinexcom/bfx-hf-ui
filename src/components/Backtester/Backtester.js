import React from 'react'

import { propTypes, defaultProps } from './Backtester.props'

import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'

import './style.css'

export default class Backtester extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    execError: null,
    loadingBacktest: false,
    execRunning: false,
    results: null,
  }

  constructor() {
    super()

    this.backtestMethods = [
      {
        type: 'Historical',
        form: RenderHistoricalForm,
        renderReport: RenderHistoricalReport,
      },
      // {
      //   type: 'Live',
      //   form: RenderLiveForm,
      //   renderReport: RenderLiveReport,
      // },
      // {
      //   type: 'Import',
      //   form: RenderImportForm,
      //   renderReport: RenderImportReport,
      // },
    ]

    this.backtestStrategy = this.backtestStrategy.bind(this)
    this.updateError = this.updateError.bind(this)
  }
  backtestStrategy = (options) => {
    const {
      activeExchange, activeMarket, startDate, endDate, tf, trades, candles,
    } = options
    const { dsExecuteBacktest, strategyContent, setBacktestOptions } = this.props
    setBacktestOptions(options)
    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    this.setState(() => ({
      execError: undefined,
    }))

    dsExecuteBacktest(activeExchange, startNum, endNum, activeMarket, tf, candles, trades, strategyContent)
  }

  updateExecutionType = (value) => {
    const newType = this.backtestMethods.filter(f => f.type === value)[0]
    this.setState(() => ({ executionType: newType }))
  }

  updateError(errMessage) {
    this.setState(() => ({
      results: null,
      execError: errMessage,
    }))
  }

  render() {
    const {
      executionType = this.backtestMethods[0],
    } = this.state
    const {
      indicators,
      backtestData,
      strategyContent,
      allMarkets,
      backtestResults,
      backtestOptions,
      favoritePairs,
      savePairs,
      authToken,
    } = this.props
    const formState = this.state[`${executionType.type}_formState`] || {} // eslint-disable-line
    const opts = {
      updateExecutionType: this.updateExecutionType,
      backtestMethods: this.backtestMethods,
      backtestStrategy: this.backtestStrategy,
      executionType: executionType.type,
      indicators,
      onFavoriteSelect: this.favoriteSelect,
      favoritePairs,
      savePairs,
      updateError: this.updateError,
      allMarkets,
      exId: 'bitfinex', // todo: add ability to specify exchange
      formState,
      authToken,
      setFormState: (setStateFunc, callback) => {
        this.setState(() => ({
          [`${executionType.type}_formState`]: {
            ...formState,
            ...setStateFunc(),
          },
        }), callback)
      },
    }

    if (!strategyContent) {
      return (
        <div className='hfui-backtester__wrapper'>
          <p>Create a strategy to begin backtesting.</p>
        </div>
      )
    }

    if (backtestResults.error) {
      return (
        <div className='hfui-backtester__wrapper'>
          <executionType.form {...opts} />
          <p style={{ color: 'red' }}>{backtestResults.error}</p>
        </div>
      )
    }

    if (!backtestResults.executing && !backtestResults.loading && backtestResults.finished) {
      return (
        <div className='hfui-backtester__wrapper'>
          <executionType.form {...opts} />
          { executionType.renderReport({ ...opts }, backtestResults, backtestData, backtestOptions) }
        </div>
      )
    }

    return (
      <div className='hfui-backtester__wrapper'>
        {
          (!backtestResults.loading) && (
            <>
              <executionType.form {...opts} />
              <p>Press start to begin backtesting.</p>
            </>
          )
        }
        {
          (backtestResults.loading) && (
            <>
              <executionType.form {...opts} disabled />
              <p>Loading candles and executing strategy...</p>
            </>
          )
        }
      </div>
    )
  }
}
