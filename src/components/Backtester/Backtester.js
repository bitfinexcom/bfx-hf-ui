import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'

import './style.css'

const backtestMethods = [
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

const Backtester = ({
  backtestData,
  strategyContent,
  allMarkets,
  backtestResults,
  backtestOptions,
  authToken,
  dsExecuteBacktest,
  setBacktestOptions,
  indicators,
  onAddIndicator,
  onDeleteIndicator,
}) => {
  const [execError, setExecError] = useState(null)
  const [executionType, setExecutionType] = useState(backtestMethods[0])
  const [formState, setFormState] = useState({})

  const backtestStrategy = (options) => {
    const {
      activeExchange, activeMarket, startDate, endDate, tf, trades, candles,
    } = options

    setBacktestOptions(options)
    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    setExecError(undefined)
    dsExecuteBacktest(activeExchange, startNum, endNum, activeMarket, tf, candles, trades, strategyContent)
  }

  const updateExecutionType = (value) => {
    const newType = backtestMethods.filter(f => f.type === value)[0]
    setExecutionType(newType)
  }

  const updateError = (errMessage) => {
    setExecError(errMessage)
  }

  const opts = {
    updateExecutionType,
    backtestMethods,
    backtestStrategy,
    executionType: executionType.type,
    indicators,
    onAddIndicator,
    onDeleteIndicator,
    updateError,
    allMarkets,
    exId: 'bitfinex', // todo: add ability to specify exchange
    formState,
    authToken,
    setFormState: (setStateFunc, callback) => {
      const form = {
        ...formState,
        ...setStateFunc(),
      }
      setFormState(form)
      callback(form)
    },
  }

  if (!strategyContent || Object.keys(strategyContent).length === 0) {
    return (
      <div className='hfui-backtester__wrapper'>
        <p>Create a strategy to begin backtesting.</p>
      </div>
    )
  }

  if (backtestResults.error || execError) {
    return (
      <div className='hfui-backtester__wrapper'>
        <executionType.form {...opts} />
        <p style={{ color: 'red' }}>{backtestResults.error || execError}</p>
      </div>
    )
  }

  if (!backtestResults.executing && !backtestResults.loading && backtestResults.finished) {
    return (
      <div className='hfui-backtester__wrapper'>
        <executionType.form {...opts} />
        {executionType.renderReport({ ...opts }, backtestResults, backtestData, backtestOptions)}
      </div>
    )
  }

  return (
    <div className='hfui-backtester__wrapper'>
      <executionType.form {...opts} disabled={backtestResults.loading} />
      <p>{backtestResults.loading ? 'Loading candles and executing strategy...' : 'Press start to begin backtesting.'}</p>
    </div>
  )
}

Backtester.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.array),
  backtest: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    executing: PropTypes.bool.isRequired,
  }),
  backtestData: PropTypes.shape({
    trades: PropTypes.array.isRequired,
    candles: PropTypes.array.isRequired,
  }),
  strategyContent: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
  ),
  allMarkets: PropTypes.objectOf(PropTypes.array),
  backtestResults: PropTypes.objectOf(PropTypes.any),
  backtestOptions: PropTypes.objectOf(PropTypes.any),
  authToken: PropTypes.string.isRequired,
  dsExecuteBacktest: PropTypes.func.isRequired,
  setBacktestOptions: PropTypes.func.isRequired,
  onAddIndicator: PropTypes.func,
  onDeleteIndicator: PropTypes.func,
}

Backtester.defaultProps = {
  indicators: [],
  backtest: {
    loading: true,
    executing: false,
  },
  backtestData: {
    trades: [],
    candles: [],
  },
  strategyContent: {},
  allMarkets: {},
  backtestResults: {},
  backtestOptions: {},
  onAddIndicator: () => {},
  onDeleteIndicator: () => {},
}

export default memo(Backtester)
