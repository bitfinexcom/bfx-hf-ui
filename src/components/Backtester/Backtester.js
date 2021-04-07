import React from 'react'
import PropTypes from 'prop-types'

import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'

import './style.css'

class Backtester extends React.PureComponent {
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

    if (!strategyContent || Object.keys(strategyContent).length === 0) {
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
}

Backtester.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object),
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
}

export default Backtester
