/* eslint-disable */

import React from 'react'
import { propTypes, defaultProps } from './Backtester.props'
import { generateResults } from './Backtester.helpers'
import StrategyExecWorker from '../../workers/strategy_exec.worker'
import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'
import './style.css'

export default class Backtester extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    backtestOptions: {},
    execError: null,
    loadingBacktest: false,
    execRunning: false,
    results: null,
  }

  constructor(props) {
    super(props)

    // TODO: Extract as constant
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
    this.onStrategyExecWorkerMessage = this.onStrategyExecWorkerMessage.bind(this)
    this.execWorker = new StrategyExecWorker()
    this.execWorker.onmessage = this.onStrategyExecWorkerMessage
    this.updateError = this.updateError.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    const { loadingBacktest, execRunning, backtestOptions } = this.state
    const { strategyContent, backtest, backtestData } = nextProps
    const { loading = false, executing = false } = backtest
    const { activeMarket, tf } = backtestOptions

    // check if component has requested a backtest
    if (!loadingBacktest) return
    // check if backtest data still being streamed
    if (loading || executing) return
    // check if the worker is already executing
    if (execRunning) return

    // start worker with data
    this.execWorker.postMessage({
      type: 'EXEC_STRATEGY',
      data: {
        mID: activeMarket,
        strategyContent,
        candleData: backtestData.candles,
        tradeData: backtestData.trades,
        tf,
      },
    })
    this.setState(() => ({ loadingBacktest: false }))
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { backtest, strategyContent } = this.props
    if (
      !_isEqual(nextState, this.state)
      || !_isEqual(nextProps.backtest, backtest)
      || !_isEqual(nextProps.strategyContent, strategyContent)
    ) {
      return true
    }

    return false
  }

  componentWillUnmount() {
    this.execWorker.terminate()
  }

  onStrategyExecWorkerMessage(incomingMessage = {}) {
    const { data: messageData } = incomingMessage
    const { type, data = {} } = messageData

    if (type === 'EXEC_STRATEGY_PARSE_ERROR') {
      const { message, section } = data

      this.setSectionError(section, message)
    } else if (type === 'EXEC_STRATEGY_START') {
      this.setState(() => ({
        execRunning: true,
        results: null,
      }))
    } else if (type === 'EXEC_STRATEGY_ERROR') {
      const { message } = data
      this.updateError(message)
      this.setState(() => ({ execRunning: false, loadingBacktest: false }))
    } else if (type === 'EXEC_STRATEGY_TICK') {
      const { currentTick, totalTicks } = data
      const { totalTicks: currentTotalTicks } = this.state

      if (totalTicks !== currentTotalTicks || currentTick % 100 === 0) {
        this.setState(() => ({
          currentTick,
          totalTicks,
        }))
      }
    } else if (type === 'EXEC_STRATEGY_END') {
      this.setState(() => ({ execRunning: false }))
      this.updateResults(data)
    }
  }

  backtestStrategy = (options) => {
    const {
      activeExchange, activeMarket, startDate, endDate, tf,
    } = options
    const { dsExecuteBacktest } = this.props
    const { loadingBacktest } = this.state

    if (loadingBacktest) return

    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    this.setState(() => ({
      loadingBacktest: true,
      backtestOptions: options,
      execError: undefined,
      results: undefined,
    }))
    dsExecuteBacktest(activeExchange, startNum, endNum, activeMarket, tf)
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

  updateResults(btState = {}) {
    const results = generateResults(btState)

    this.setState(() => ({
      results,
      execError: null,
    }))
  }

  render() {
    const {
      executionType = this.backtestMethods[0],
      execRunning,
      loadingBacktest,
      execError,
      results,
    } = this.state
    const {
      indicators,
      backtestData,
      strategyContent,
      allMarkets,
    } = this.props
    const opts = {
      updateExecutionType: this.updateExecutionType,
      backtestMethods: this.backtestMethods,
      backtestStrategy: this.backtestStrategy,
      executionType,
      indicators,
      updateError: this.updateError,
      allMarkets,
      exId: 'bitfinex', // todo: add ability to specify exchange
    }

    if (!strategyContent) {
      return (
        <div className='hfui-backtester__wrapper'>
          <p>Create a strategy to begin backtesting.</p>
        </div>
      )
    }

    if (!results) {
      if (execError) {
        return (
          <div className='hfui-backtester__wrapper'>
            <executionType.form {...opts} />
            <p style={{ color: 'red' }}>{execError}</p>
          </div>
        )
      }
      return (
        <div className='hfui-backtester__wrapper'>
          {
            (!execRunning && !loadingBacktest) && (
              <>
                <executionType.form {...opts} />
                <p>Press start to begin backtesting.</p>
              </>
            )
          }
          {
            (!execRunning && loadingBacktest) && (
              <>
                <executionType.form {...opts} disabled />
                <p>Loading backtest candles...</p>
              </>
            )
          }
          {
            (execRunning) && (
              <>
                <executionType.form {...opts} disabled />
                <p>Executing strategy...</p>
              </>
            )
          }
        </div>
      )
    }

    return (
      <div className='hfui-backtester__wrapper'>
        <executionType.form {...opts} />

        {
          (!execRunning) && (
            executionType.renderReport(opts, results, backtestData)
          )
        }
      </div>
    )
  }
}
