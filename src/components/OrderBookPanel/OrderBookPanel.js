import React from 'react'
import _capitalize from 'lodash/capitalize'

import OrderBook from '../OrderBook'
import MarketSelect from '../MarketSelect'

import PanelSettings from '../../ui/PanelSettings'
import Checkbox from '../../ui/Checkbox'
import Select from '../../ui/Select'
import Panel from '../../ui/Panel'
import nearestMarket from '../../util/nearest_market'
import { propTypes, defaultProps } from './OrderBookPanel.props'

export default class OrderBookPanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    settingsOpen: false,
  }

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const {
      currentMarket, currentExchange, marketDirty, exchangeDirty,
      sumAmounts = true, stackedView = true,
    } = savedState

    this.state = {
      ...this.state,
      sumAmounts,
      stackedView,
      currentMarket,
      currentExchange,
      marketDirty,
      exchangeDirty,
    }

    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onChangeExchange = this.onChangeExchange.bind(this)
    this.onToggleSettings = this.onToggleSettings.bind(this)
    this.onChangeSumAmounts = this.onChangeSumAmounts.bind(this)
    this.onChangeStackedView = this.onChangeStackedView.bind(this)
  }

  componentDidMount() {
    const { currentExchange, currentMarket } = this.state
    const { addOBRequirement } = this.props
    addOBRequirement(currentExchange, currentMarket)
  }

  componentWillUnmount() {
    const { currentExchange, currentMarket } = this.state
    const { removeOBRequirement } = this.props
    removeOBRequirement(currentExchange, currentMarket)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      marketDirty, currentMarket, exchangeDirty, currentExchange,
    } = prevState

    const {
      activeExchange, activeMarket, addOBRequirement, removeOBRequirement,
    } = nextProps

    if ((marketDirty || exchangeDirty) || (
      activeMarket === currentMarket && activeExchange === currentExchange
    )) {
      return {}
    }

    removeOBRequirement(currentExchange, currentMarket)
    addOBRequirement(activeExchange, activeMarket)

    return {
      currentMarket: activeMarket,
      currentExchange: activeExchange,
    }
  }

  onToggleSettings() {
    this.setState(({ settingsOpen }) => ({
      settingsOpen: !settingsOpen,
    }))
  }

  onChangeSumAmounts(sumAmounts) {
    this.setState(() => ({ sumAmounts }))
    this.deferSaveState()
  }

  onChangeStackedView(stackedView) {
    this.setState(() => ({ stackedView }))
    this.deferSaveState()
  }

  onChangeMarket(market) {
    const { currentExchange, currentMarket } = this.state
    const { addOBRequirement, removeOBRequirement } = this.props

    if (market.restID === currentMarket.restID) {
      return
    }

    this.setState(() => ({
      currentMarket: market,
      marketDirty: true,
    }))

    removeOBRequirement(currentExchange, currentMarket)
    addOBRequirement(currentExchange, market)
    this.deferSaveState()
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange, currentMarket } = this.state
    const { allMarkets, addOBRequirement, removeOBRequirement } = this.props

    if (exchange === currentExchange) {
      return
    }

    const markets = allMarkets[exchange] || []
    const newMarket = nearestMarket(currentMarket, markets)

    this.setState(() => ({
      currentExchange: exchange,
      currentMarket: newMarket,
      exchangeDirty: true,
      marketDirty: true,
    }))

    removeOBRequirement(currentExchange, currentMarket)
    addOBRequirement(exchange, newMarket)
    this.deferSaveState()
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const {
      currentExchange, currentMarket, exchangeDirty, marketDirty, sumAmounts,
      stackedView,
    } = this.state

    saveState(layoutID, layoutI, {
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,
      sumAmounts,
      stackedView,
    })
  }

  renderExchangeDropdown() {
    const { exchangeDirty, currentExchange } = this.state
    const { exchanges, canChangeExchange } = this.props

    return (
      <Select
        key='exchange-dropdown'
        disabled={!canChangeExchange}
        className={{ yellow: exchangeDirty }}
        onChange={this.onChangeExchange}
        value={{
          label: _capitalize(currentExchange),
          value: currentExchange,
        }}
        options={exchanges.map(ex => ({
          label: _capitalize(ex),
          value: ex,
        }))}
      />
    )
  }

  renderMarketDropdown() {
    const { currentExchange, marketDirty, currentMarket } = this.state
    const { allMarkets, canChangeMarket } = this.props

    const markets = allMarkets[currentExchange] || []

    return (
      <MarketSelect
        key='market-dropdown'
        disabled={!canChangeMarket}
        className={{ yellow: marketDirty }}
        onChange={this.onChangeMarket}
        value={currentMarket}
        markets={markets}
      />
    )
  }

  render() {
    const {
      onRemove, showExchange, showMarket, canChangeStacked, moveable,
      removeable, dark,
    } = this.props

    const {
      currentExchange, currentMarket, settingsOpen, sumAmounts, stackedView,
    } = this.state

    return (
      <Panel
        label='ORDER BOOK'
        dark={dark}
        darkHeader={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        secondaryHeaderComponents={[
          showExchange && this.renderExchangeDropdown(),
          showMarket && this.renderMarketDropdown(),
        ]}
        settingsOpen={settingsOpen}
        onToggleSettings={this.onToggleSettings}
      >
        {settingsOpen ? (
          <PanelSettings
            onClose={this.onToggleSettings}
            content={[
              <Checkbox
                key='sum-amounts'
                label='Sum Amounts'
                value={sumAmounts}
                onChange={this.onChangeSumAmounts}
              />,
              canChangeStacked && (
              <Checkbox
                key='stacked-view'
                label='Stacked View'
                value={stackedView}
                onChange={this.onChangeStackedView}
              />
              ),
            ]}
          />
        ) : (
          <OrderBook
            stackedView={stackedView}
            sumAmounts={sumAmounts}
            exchange={currentExchange}
            market={currentMarket}
          />
        )}
      </Panel>
    )
  }
}
