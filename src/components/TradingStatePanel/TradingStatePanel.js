import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import Panel from '../../ui/Panel'
import PositionsTable from '../PositionsTable'
import AtomicOrdersTable from '../AtomicOrdersTable'
import AlgoOrdersTable from '../AlgoOrdersTable'
import BalancesTable from '../BalancesTable'
import './style.css'

const renderCounter = (num) => {
  if (num <= 0) {
    return ''
  }

  return <span className='hfui-tspanel-counter'>{num}</span>
}

class TradingStatePanel extends React.Component {
  constructor(props) {
    super(props)

    const { savedState = {} } = props
    const { marketFilterActive = false } = savedState

    this.state = {
      marketFilterActive,
    }

    this.onToggleMarketFilter = this.onToggleMarketFilter.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state))
  }

  componentDidUpdate() {}
  getSnapshotBeforeUpdate() {
    return this.loadData()
  }

  onToggleMarketFilter() {
    this.setState(({ marketFilterActive }) => ({
      marketFilterActive: !marketFilterActive,
    }))
  }

  getFilteredAtomicOrders() {
    const {
      activeMarket, atomicOrders, setFilteredValueWithKey,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredAtomicOrders = marketFilterActive
      ? atomicOrders.filter(o => o.symbol === activeMarket.wsID)
      : atomicOrders

    setFilteredValueWithKey('filteredAtomicOrders', filteredAtomicOrders)
    return filteredAtomicOrders
  }

  getFilteredAlgoOrders() {
    const {
      activeMarket, algoOrders, setFilteredValueWithKey,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredAO = marketFilterActive
      ? algoOrders.filter(ao => ao.args.symbol === activeMarket.wsID)
      : algoOrders

    setFilteredValueWithKey('filteredAO', filteredAO)
    return filteredAO
  }

  getFilteredPositions() {
    const {
      activeMarket, positions, setFilteredValueWithKey,
    } = this.props
    const { marketFilterActive } = this.state
    const filteredPositions = marketFilterActive
      ? positions.filter(p => p.symbol === activeMarket.wsID)
      : positions

    setFilteredValueWithKey('filteredPositions', filteredPositions)
    return filteredPositions
  }

  getFilteredBalances() {
    const {
      balances, setFilteredValueWithKey, activeMarket,
    } = this.props
    const { base, quote } = activeMarket
    const { marketFilterActive } = this.state
    const filteredBalances = marketFilterActive ? balances.filter(({ currency }) => currency === base || currency === quote) : balances

    setFilteredValueWithKey('filteredBalances', filteredBalances)
    return filteredBalances
  }

  loadData() {
    this.getFilteredAtomicOrders()
    this.getFilteredAlgoOrders()
    this.getFilteredPositions()
    this.getFilteredBalances()

    return null
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const { marketFilterActive } = this.state

    saveState(layoutID, layoutI, {
      marketFilterActive,
    })
  }

  render() {
    const {
      dark,
      onRemove,
      moveable,
      removeable,
      activeMarket,
      positionsCount,
      algoOrdersCount,
      atomicOrdersCount,
    } = this.props
    const { marketFilterActive } = this.state

    return (
      <Panel
        label='TRADING STAGE'
        dark={dark}
        darkHeader={dark}
        className='hfui-tradingstatepanel__wrapper'
        moveable={false}
        removeable={false}
        extraIcons={[(
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
            renderedInTradingState
            htmlKey='Positions'
            tabtitle={(
              <span>
                Positions
                {renderCounter(positionsCount)}
              </span>
            )}
          />
          <AtomicOrdersTable
            htmlKey='Atomics'
            tabtitle={(
              <span>
                Atomics
                {renderCounter(atomicOrdersCount)}
              </span>
            )}
          />
          <AlgoOrdersTable
            htmlKey='Algos'
            tabtitle={(
              <span>
                Algos
                {renderCounter(algoOrdersCount)}
              </span>
            )}
          />
          <BalancesTable
            renderedInTradingState
            htmlKey='Balances'
            tabtitle='Balances'
            hideZeroBalances
          />
        </Panel>
      </Panel>
    )
  }
}

TradingStatePanel.propTypes = {
  dark: PropTypes.bool,
  moveable: PropTypes.bool,
  onRemove: PropTypes.func,
  removeable: PropTypes.bool,
  positionsCount: PropTypes.number,
  algoOrdersCount: PropTypes.number,
  atomicOrdersCount: PropTypes.number,
  saveState: PropTypes.func.isRequired,
  layoutID: PropTypes.string.isRequired,
  layoutI: PropTypes.string.isRequired,
  setFilteredValueWithKey: PropTypes.func.isRequired,
  activeMarket: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
  balances: PropTypes.arrayOf(PropTypes.object).isRequired,
  positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  savedState: PropTypes.objectOf(PropTypes.bool).isRequired,
  algoOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  atomicOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TradingStatePanel.defaultProps = {
  dark: true,
  moveable: false,
  removeable: false,
  positionsCount: 0,
  onRemove: () => {},
  algoOrdersCount: 0,
  atomicOrdersCount: 0,
}

export default TradingStatePanel
