import React from 'react'

import { propTypes, defaultProps } from './Backtester.props'

import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'
import RenderDazaarReport from './reports/DazaarReport'
import RenderDazaarForm from './forms/DazaarForm'
import RenderManageDataPage from './ManageDataPage'
import Navbar from './Navbar'
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
    manageDataOpened: false,
  }

  constructor() {
    super()

    this.backtestMethods = [
      {
        type: 'Historical',
        form: RenderHistoricalForm,
        renderReport: RenderHistoricalReport,
      },
      {
        type: 'Dazaar',
        form: RenderDazaarForm,
        renderReport: RenderDazaarReport,
      },
    ]

    this.backtestStrategy = this.backtestStrategy.bind(this)
    this.updateError = this.updateError.bind(this)
    this.setBacktestingPage = this.setBacktestingPage.bind(this)
    this.closeManageData = this.closeManageData.bind(this)
    this.dsExecuteDazaar = this.dsExecuteDazaar.bind(this)
  }

  setBacktestingPage(page) {
    const { setBacktestingPage } = this.props
    const { manageDataOpened } = this.state
    if (manageDataOpened) {
      this.closeManageData()
    }
    setBacktestingPage(page)
  }

  backtestStrategy = (options) => {
    const {
      activeExchange, activeMarket, startDate, endDate, tf, trades, candles,
    } = options
    const { dsExecuteBacktest, strategyContent } = this.props

    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    this.setState(() => ({
      backtestOptions: options,
      execError: undefined,
    }))

    dsExecuteBacktest(activeExchange, startNum, endNum, activeMarket, tf, candles, trades, strategyContent)
  }

  updateExecutionType = (value) => {
    const newType = this.backtestMethods.filter(f => f.type === value)[0]
    this.setState(() => ({ executionType: newType }))
  }

  dsExecuteDazaar(options) {
    const {
      activeExchange, startDate, endDate, tf, ids, opts, activeMarket,
    } = options
    const { dsExecuteDazaar, strategyContent } = this.props

    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    this.setState(() => ({
      backtestOptions: options,
      execError: undefined,
    }))
    dsExecuteDazaar(activeExchange, startNum, endNum, activeMarket, ids, tf, opts, strategyContent)
  }

  updateError(errMessage) {
    this.setState(() => ({
      results: null,
      execError: errMessage,
    }))
  }

  openManageData() {
    const { getHyperCores } = this.props
    getHyperCores()
    this.setState(() => ({
      manageDataOpened: true,
    }))
  }

  closeManageData() {
    this.setState(() => ({
      manageDataOpened: false,
    }))
  }

  render() {
    let {
      executionType = this.backtestMethods[0],
    } = this.state
    const {
      backtestOptions,
      manageDataOpened,
    } = this.state
    const {
      indicators,
      backtestData,
      strategyContent,
      allMarkets,
      backtestResults,
      backtestingPage = 'classic',
      dazaarCoresList,
      removeCores,
    } = this.props
    const tos = !!(window.localStorage.getItem('tos') || '').length
    if (backtestingPage === 'classic' && executionType !== this.backtestMethods[0]) {
      [executionType] = this.backtestMethods
    } else if (backtestingPage === 'daazar' && executionType !== this.backtestMethods[1]) {
      [, executionType] = this.backtestMethods
    }
    const formState = this.state[`${executionType.type}_formState`] || {} // eslint-disable-line
    const opts = {
      updateExecutionType: this.updateExecutionType,
      backtestMethods: this.backtestMethods,
      backtestStrategy: this.backtestStrategy,
      dsExecuteDazaar: this.dsExecuteDazaar,
      executionType: executionType.type,
      indicators,
      updateError: this.updateError,
      allMarkets,
      exId: 'bitfinex', // todo: add ability to specify exchange
      formState,
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

    if (!backtestResults.executing && !backtestResults.loading && backtestResults.finished && !manageDataOpened) {
      return (
        <div className='hfui-backtester__wrapper'>
          <Navbar backtestingPage={backtestingPage} setBacktestingPage={this.setBacktestingPage} openManageData={() => this.openManageData()} manageDataOpened={manageDataOpened} />
          <executionType.form {...opts} />
          { executionType.renderReport({ ...opts }, backtestResults, backtestData, backtestOptions) }
        </div>
      )
    }
    if (backtestingPage === 'daazar' && manageDataOpened) {
      return (
        <div className='hfui-backtester__wrapper'>
          <Navbar backtestingPage={backtestingPage} setBacktestingPage={this.setBacktestingPage} openManageData={() => this.openManageData()} manageDataOpened={manageDataOpened} />
          <RenderManageDataPage closeManageData={this.closeManageData} data={dazaarCoresList} removeCores={removeCores} />
        </div>
      )
    }
    return (
      <div className='hfui-backtester__wrapper'>
        { tos && (<Navbar backtestingPage={backtestingPage} setBacktestingPage={this.setBacktestingPage} openManageData={() => this.openManageData()} manageDataOpened={manageDataOpened} />) }
        {
          (!backtestResults.loading) && (
            <>
              <executionType.form {...opts} />
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
