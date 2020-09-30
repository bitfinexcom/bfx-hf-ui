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

const renderCounter = (num) => {
  if (num <= 0) {
    return ''
  }

  return <span className='hfui-tspanel-counter'>{num}</span>
}

export default class TradingStatePanel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const {
      exchangeFilterActive = false,
      marketFilterActive = false,
    } = savedState

    this.state = {
      exchangeFilterActive,
      marketFilterActive,
    }

    this.onToggleMarketFilter = this.onToggleMarketFilter.bind(this)
    this.onToggleExchangeFilter = this.onToggleExchangeFilter.bind(this)
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
      ? filteredByExchange.filter(o => o.symbol === activeMarket.wsID)
      : filteredByExchange
  }

  getFilteredAlgoOrders() {
    const { activeExchange, activeMarket, algoOrders } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(algoOrders[activeExchange] || {})
      : _flatten(Object.values(algoOrders).map(Object.values))

    return marketFilterActive
      ? filteredByExchange.filter(ao => ao.args.symbol === activeMarket.wsID)
      : filteredByExchange
  }

  getFilteredPositions() {
    const { activeExchange, activeMarket, positions } = this.props
    const { exchangeFilterActive, marketFilterActive } = this.state

    const filteredByExchange = exchangeFilterActive
      ? Object.values(positions[activeExchange] || {})
      : _flatten(Object.values(positions).map(Object.values))

    return marketFilterActive
      ? filteredByExchange.filter(p => p.symbol === activeMarket.wsID)
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
    const { marketFilterActive, exchangeFilterActive } = this.state

    saveState(layoutID, layoutI, {
      exchangeFilterActive,
      marketFilterActive,
    })
  }

  render() {
    const {
      onRemove, activeExchange, activeMarket, moveable, removeable,
    } = this.props

    const { exchangeFilterActive, marketFilterActive } = this.state
    const atomicOrders = this.getFilteredAtomicOrders()
    const algoOrders = this.getFilteredAlgoOrders()
    const positions = this.getFilteredPositions()
    const balances = this.getFilteredBalances()

    return (
      <Panel
        label='TRADING STAGE'
        className='hfui-tradingstatepanel__wrapper'
        moveable={false}
        removeable={false}
        extraIcons={[(
          <div
            key='filter-exchange'
            onClick={this.onToggleExchangeFilter}
            className={ClassNames('hfui-tspanel-header-button', {
              active: exchangeFilterActive,
            })}
          >
            <i className='icon-filter-active' />
            <p>{_capitalize(activeExchange)}</p>
          </div>
        ), (
          <div
            key='filter-market'
            onClick={this.onToggleMarketFilter}
            className={ClassNames('hfui-tspanel-header-button', {
              active: marketFilterActive,
            })}
          >
            <i className='icon-filter-active' />
            <p>{activeMarket.uiID}</p>
          </div>
        ), (
          <div key='filter-by'>
            <p className='hfui-uppercase'>Filter By:</p>
          </div>
        )]}
      >
        <Panel
          onRemove={onRemove}
          moveable={moveable}
          removeable={removeable}
          darkHeader
        >
          <PositionsTable
            htmlKey='Positions'
            tabTitle={(
              <span>
                Positions
                {renderCounter(positions.length)}
              </span>
            )}
            exID={activeExchange}
            positions={positions}
          />
          <AtomicOrdersTable
            htmlKey='Atomics'
            tabTitle={(
              <span>
                Atomics
                {renderCounter(atomicOrders.length)}
              </span>
            )}
            exID={activeExchange}
            orders={atomicOrders}
          />
          <AlgoOrdersTable
            htmlKey='Algos'
            tabTitle={(
              <span>
                Algos
                {renderCounter(algoOrders.length)}
              </span>
            )}
            exID={activeExchange}
            orders={algoOrders}
          />
          <BalancesTable
            tabTitle='Balances'
            exID={activeExchange}
            hideZeroBalances
            balances={balances}
          />
        </Panel>
      </Panel>
    )
  }
}
