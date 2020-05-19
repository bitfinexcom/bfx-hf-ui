/* eslint-disable */ 
import React from 'react'
import _isEqual from 'lodash/isEqual'

import Chart from '../Chart'
import { propTypes, defaultProps } from './Backtester.props'
import Spinner from '../../ui/Spinner'

import { generateResults } from './Backtester.helpers'
import StrategyExecWorker from '../../workers/strategy_exec.worker'

// Reports
import RenderHistoricalReport from './reports/HistoricalReport'
import RenderLiveReport from './reports/LiveReport'
import RenderImportReport from './reports/ImportReport'

// Forms
import RenderHistoricalForm from './forms/HistoricalForm'
import RenderLiveForm from './forms/LiveForm'
import RenderImportForm from './forms/ImportForm'


import './style.css'

export default class Backtester extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    backtestOptions: {},
    execError: null,
    loadingBacktest: false,
    execRunning: false,
    results: null,
  }

  constructor() {
    super()

    this.executionTypes = [
      {
        type: 'Historical',
        form: RenderHistoricalForm,
        submitForm: () => {},
        renderReport: RenderHistoricalReport,
      },
      {
        type: 'Live',
        form: RenderLiveForm,
        submitForm: () => {},
        renderReport: RenderLiveReport,
      },
      {
        type: 'Import',
        form: RenderImportForm,
        submitForm: () => {},
        renderReport: RenderImportReport,
      },
    ]

    this.backtestStrategy = this.backtestStrategy.bind(this)
    this.onStrategyExecWorkerMessage = this.onStrategyExecWorkerMessage.bind(this)
    this.execWorker = new StrategyExecWorker()
    this.execWorker.onmessage = this.onStrategyExecWorkerMessage
    this.updateError = this.updateError.bind(this)
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

  componentWillReceiveProps(nextProps) {
    const { loadingBacktest, execRunning, backtestOptions } = this.state
    const { backtest, backtestData } = nextProps
    const { strategyContent } = this.props
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
    this.setState({ loadingBacktest: false })
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

  renderHistoricalReport = () => {
    return (
      <div />
    )
  }

  updateResults(btState = {}) {
    const results = generateResults(btState)

    this.setState(() => ({
      results,
      execError: null,
    }))
  }

  updateError(errMessage) {
    this.setState(() => ({
      results: null,
      execError: errMessage,
    }))
  }

  updateExecutionType = (value) => {
    const newType = this.executionTypes.filter(f => f.type === value)[0]
    this.setState({ executionType: newType })
  }

  backtestStrategy = (options) => {
    const {
      activeExchange, activeMarket, startDate, endDate
    } = options
    const { dsExecuteBacktest } = this.props
    const { loadingBacktest } = this.state

    if (loadingBacktest) return

    dsExecuteBacktest(activeExchange, startDate, endDate, activeMarket, '1m')
    this.setState({
      loadingBacktest: true,
      backtestOptions: options,
      execError: undefined,
      results: undefined,
    })
  }

  render() {
    const {
      executionType = this.executionTypes[0],
      execRunning,
      loadingBacktest,
      execError,
      results,
    } = this.state
    const { indicators, backtestData, strategyContent } = this.props
    const opts = {
      updateExecutionType: this.updateExecutionType,
      executionTypes: this.executionTypes,
      backtestStrategy: this.backtestStrategy,
      executionType,
      indicators,
      updateError: this.updateError,
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
      } else {
        return (
          <div className='hfui-backtester__wrapper'>
            {
              (!execRunning && !loadingBacktest) && (
                <React.Fragment>
                  <executionType.form {...opts} />
                  <p>Press start to begin backtesting.</p>
                </React.Fragment>
              )
            }
            {
              (!execRunning && loadingBacktest) && (
                <React.Fragment>
                  <executionType.form {...opts} disabled />
                  <p>Loading backtest candles...</p>
                </React.Fragment>
              )
            }
            {
              (execRunning) && (
                <React.Fragment>
                  <executionType.form {...opts} disabled />
                  <p>Executing strategy...</p>
                </React.Fragment>
              )
            }
          </div>
        )
      }
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
/* eslint-enable */
