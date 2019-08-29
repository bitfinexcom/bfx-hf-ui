import React from 'react'
import ClassNames from 'classnames'
import _capitalize from 'lodash/capitalize'
import _flatten from 'lodash/flatten'

import Panel from '../../ui/Panel'
import PositionsTable from '../PositionsTable'
import AtomicOrdersTable from '../AtomicOrdersTable'
import AlgoOrdersTable from '../AlgoOrdersTable'
import BalancesTable from '../BalancesTable'
import { propTypes, defaultProps } from './TradingStatePanel.props'
import './style.css'

const DEFAULT_ACTIVE_TAB = 'positions'

export default class TradingStatePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const {
      activeTab = DEFAULT_ACTIVE_TAB,
      exchangeFilterActive = false,
      marketFilterActive = false,
    } = savedState

    this.state = {
      exchangeFilterActive,
      marketFilterActive,
      activeTab,
    }

    this.onChangeTab = this.onChangeTab.bind(this)
    this.onToggleMarketFilter = this.onToggleMarketFilter.bind(this)
    this.onToggleExchangeFilter = this.onToggleExchangeFilter.bind(this)
  }

  onChangeTab(activeTab) {
    this.setState(() => ({ activeTab }))
    this.deferSaveState()
  }

  onToggleMarketFilter() {
    this.setState(({ marketFilterActive }) => ({
      marketFilterActive: !marketFilterActive,
    }))
  }

  onToggleExchangeFilter() {
    this.setState(({ exchangeFilterActive }) => ({
      exchangeFilterActive: !exchangeFilterActive,
    }))
  }

  getFilteredAtomicOrders() {
    const { activeExchange, activeMarket, atomicOrders } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(atomicOrders[activeExchange] || {})
      : _flatten(Object.values(atomicOrders).map(Object.values))

    return marketFilterActive
      ? filteredByExchange.filter(o => o.symbol === activeMarket.w)
      : filteredByExchange
  }

  getFilteredAlgoOrders() {
    const { activeExchange, activeMarket, algoOrders } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(algoOrders[activeExchange] || {})
      : _flatten(Object.values(algoOrders).map(Object.values))

    return marketFilterActive
      ? filteredByExchange.filter(ao => ao.args.symbol === activeMarket.w)
      : filteredByExchange
  }

  getFilteredPositions() {
    const { activeExchange, activeMarket, positions } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(positions[activeExchange] || {})
      : _flatten(Object.values(positions).map(Object.values))

    return marketFilterActive
      ? filteredByExchange.filter(p => p.symbol === activeMarket.w)
      : filteredByExchange
  }

  getFilteredBalances() {
    const { activeExchange, balances } = this.props
    const { exchangeFilterActive } = this.state

    return exchangeFilterActive
      ? Object.values(balances[activeExchange] || {})
      : _flatten(Object.values(balances).map(Object.values))
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const { activeTab, marketFilterActive, exchangeFilterActive } = this.state

    saveState(layoutID, layoutI, {
      exchangeFilterActive,
      marketFilterActive,
      activeTab,
    })
  }

  render() {
    const {
      onRemove, activeExchange, activeMarket, moveable, removeable,
    } = this.props

    const { activeTab, exchangeFilterActive, marketFilterActive } = this.state
    const atomicOrders = this.getFilteredAtomicOrders()
    const algoOrders = this.getFilteredAlgoOrders()
    const positions = this.getFilteredPositions()
    const balances = this.getFilteredBalances()

    return (
      <Panel
        label='TRADING STATE'
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        tabs={[{
          id: 'positions',
          label: 'POSITIONS',
          suffix: positions.length,
        }, {
          id: 'atomics',
          label: 'ATOMIC ORDERS',
          suffix: atomicOrders.length,
        }, {
          id: 'algos',
          label: 'ALGO ORDERS',
          suffix: algoOrders.length,
        }, {
          id: 'balances',
          label: 'BALANCES',
        }]}

        activeTab={activeTab}
        onChangeTab={this.onChangeTab}
        className='dtc-tradingstatepanel__wrapper'
        headerComponents={[(
          <div
            key='filter-market'
            onClick={this.onToggleMarketFilter}
            className={ClassNames('dtc-tspanel-header-button', {
              active: marketFilterActive,
            })}
          >
            <i className='fas fa-filter' />
            <p>{activeMarket.u}</p>
          </div>
        ), (
          <div
            key='filter-exchange'
            onClick={this.onToggleExchangeFilter}
            className={ClassNames('dtc-tspanel-header-button', {
              active: exchangeFilterActive,
            })}
          >
            <i className='fas fa-filter' />
            <p>{_capitalize(activeExchange)}</p>
          </div>
        )]}
      >
        {activeTab === 'positions' && (
          <PositionsTable
            exID={activeExchange}
            positions={positions}
          />
        )}

        {activeTab === 'atomics' && (
          <AtomicOrdersTable
            exID={activeExchange}
            orders={atomicOrders}
          />
        )}

        {activeTab === 'algos' && (
          <AlgoOrdersTable
            exID={activeExchange}
            orders={algoOrders}
          />
        )}

        {activeTab === 'balances' && (
          <BalancesTable
            exID={activeExchange}
            hideZeroBalances
            balances={balances}
          />
        )}
      </Panel>
    )
  }
}
