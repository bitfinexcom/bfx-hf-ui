import React from 'react'
import _capitalize from 'lodash/capitalize'

import TradesTable from '../TradesTable'
import MarketSelect from '../MarketSelect'

import Panel from '../../ui/Panel'
import Select from '../../ui/Select'
import nearestMarket from '../../util/nearest_market'
import { propTypes, defaultProps } from './TradesTablePanel.props'

export default class TradesTablePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {}, activeMarket } = props
    const {
      currentMarket = activeMarket, currentExchange, marketDirty, exchangeDirty,
    } = savedState

    this.state = {
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,
    }

    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onChangeExchange = this.onChangeExchange.bind(this)
  }

  componentDidMount() {
    const { currentExchange, currentMarket } = this.state
    const { addTradesRequirement } = this.props
    addTradesRequirement(currentExchange, currentMarket)
  }

  componentWillUnmount() {
    const { currentExchange, currentMarket } = this.state
    const { removeTradesRequirement } = this.props
    removeTradesRequirement(currentExchange, currentMarket)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      currentExchange, currentMarket, exchangeDirty, marketDirty,
    } = prevState

    const {
      activeExchange, activeMarket, addTradesRequirement,
      removeTradesRequirement,
    } = nextProps

    if ((marketDirty || exchangeDirty) || (
      activeMarket.restID === currentMarket.restID && activeExchange === currentExchange
    )) {
      return {}
    }

    removeTradesRequirement(currentExchange, currentMarket)
    addTradesRequirement(activeExchange, activeMarket)

    return {
      currentMarket: activeMarket,
      currentExchange: activeExchange,
    }
  }

  onChangeMarket(market) {
    const { currentMarket } = this.state
    const {
      activeExchange, addTradesRequirement, removeTradesRequirement,
    } = this.props

    if (market.restID === currentMarket.restID) {
      return
    }

    this.setState(() => ({
      currentMarket: market,
      marketDirty: true,
    }))

    removeTradesRequirement(activeExchange, currentMarket)
    addTradesRequirement(activeExchange, market)
    this.deferSaveState()
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange, currentMarket } = this.state
    const {
      addTradesRequirement, removeTradesRequirement, allMarkets,
    } = this.props

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

    removeTradesRequirement(currentExchange, currentMarket)
    addTradesRequirement(exchange, newMarket)
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
      currentMarket, currentExchange, exchangeDirty, marketDirty,
    } = this.state

    saveState(layoutID, layoutI, {
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,
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
    const { marketDirty, currentMarket, currentExchange } = this.state
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
      label, onRemove, moveable, removeable, showExchange, showMarket, dark, allMarkets,
    } = this.props
    console.log(allMarkets)
    const { currentExchange, currentMarket } = this.state

    return (
      <Panel
        dark={dark}
        darkHeader={dark}
        label={label}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        className='hfui-tradestable__wrapper'
        secondaryHeaderComponents={[
          showExchange && this.renderExchangeDropdown(),
          showMarket && this.renderMarketDropdown(),
        ]}
      >
        <TradesTable
          exchange={currentExchange}
          market={currentMarket}
        />
      </Panel>
    )
  }
}
