import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import _capitalize from 'lodash/capitalize'

import Chart from '../Chart'
import MarketSelect from '../MarketSelect'

import Panel from '../../ui/Panel'
import Select from '../../ui/Select'
import nearestMarket from '../../util/nearest_market'

export default class ChartPanel extends React.Component {
  static propTypes = {
    dark: PropTypes.bool,
    label: PropTypes.string,
    onRemove: PropTypes.func,
    moveable: PropTypes.bool,
    removeable: PropTypes.bool,
    activeMarket: PropTypes.shape({
      base: PropTypes.string,
      quote: PropTypes.string,
      restID: PropTypes.string,
    }),
    saveState: PropTypes.func,
    savePairs: PropTypes.func,
    authToken: PropTypes.string,
    canChangeMarket: PropTypes.bool,
    showChartMarket: PropTypes.bool,
    activeExchange: PropTypes.string,
    canChangeExchange: PropTypes.bool,
    layoutI: PropTypes.string.isRequired,
    addTradesRequirement: PropTypes.func,
    layoutID: PropTypes.string.isRequired,
    removeTradesRequirement: PropTypes.func,
    savedState: PropTypes.shape({
      currentExchange: PropTypes.string,
      currentMarket: PropTypes.objectOf(PropTypes.oneOfType(
        PropTypes.array,
        PropTypes.string,
      )),
      marketDirty: PropTypes.bool,
      exchangeDirty: PropTypes.bool,
    }),
    allMarkets: PropTypes.objectOf(PropTypes.array),
    exchanges: PropTypes.arrayOf(PropTypes.string),
    favoritePairs: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    dark: true,
    label: null,
    allMarkets: {},
    savedState: {},
    moveable: true,
    removeable: true,
    onRemove: () => {},
    activeMarket: {
      base: 'BTC',
      quote: 'USD',
      restID: 'tBTCUSD',
    },
    authToken: null,
    favoritePairs: [],
    savePairs: () => {},
    saveState: () => {},
    showChartMarket: false,
    canChangeMarket: false,
    exchanges: ['bitfinex'],
    canChangeExchange: false,
    activeExchange: 'bitfinex',
    addTradesRequirement: () => {},
    removeTradesRequirement: () => {},

  }

  constructor(props) {
    super(props)

    const { savedState, activeMarket } = props
    const {
      marketDirty,
      exchangeDirty,
      currentExchange,
      currentMarket = activeMarket,
    } = savedState

    this.state = {
      marketDirty,
      currentMarket,
      exchangeDirty,
      currentExchange,
    }
  }

  componentDidMount() {
    const { addTradesRequirement } = this.props
    const { currentExchange, currentMarket } = this.state
    addTradesRequirement(currentExchange, currentMarket)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }

  componentWillUnmount() {
    const { removeTradesRequirement } = this.props
    const { currentExchange, currentMarket } = this.state
    removeTradesRequirement(currentExchange, currentMarket)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      marketDirty,
      exchangeDirty,
      currentMarket,
      currentExchange,
    } = prevState

    const {
      activeMarket,
      activeExchange,
      addTradesRequirement,
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

  onChangeMarket = (market) => {
    const { currentMarket } = this.state
    const {
      activeExchange,
      addTradesRequirement,
      removeTradesRequirement,
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

  onChangeExchange = (option) => {
    const { value: exchange } = option
    const { currentExchange, currentMarket } = this.state
    const {
      allMarkets,
      addTradesRequirement,
      removeTradesRequirement,
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
      marketDirty,
      currentMarket,
      exchangeDirty,
      currentExchange,
    } = this.state

    saveState(layoutID, layoutI, {
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,
    })
  }

  favoriteSelect(pair, isAddition) {
    const { savePairs, authToken, favoritePairs } = this.props
    if (isAddition) {
      savePairs([...favoritePairs, pair], authToken)
    } else {
      const filtredPairs = favoritePairs.filter(p => p !== pair)
      savePairs(filtredPairs, authToken)
    }
  }

  renderExchangeDropdown() {
    const { exchanges, canChangeExchange } = this.props
    const { exchangeDirty, currentExchange } = this.state

    return (
      <Select
        key='exchange-dropdown'
        disabled={!canChangeExchange}
        onChange={this.onChangeExchange}
        className={{ yellow: exchangeDirty }}
        value={{
          value: currentExchange,
          label: _capitalize(currentExchange),
        }}
        options={exchanges.map(ex => ({
          value: ex,
          label: _capitalize(ex),
        }))}
      />
    )
  }

  renderMarketDropdown() {
    const { allMarkets, canChangeMarket, favoritePairs } = this.props
    const { marketDirty, currentMarket, currentExchange } = this.state
    const markets = allMarkets[currentExchange] || []

    return (
      <MarketSelect
        markets={markets}
        renderWithFavorites
        key='market-dropdown'
        value={currentMarket}
        disabled={!canChangeMarket}
        favoritePairs={favoritePairs}
        onChange={this.onChangeMarket}
        className={{ yellow: marketDirty }}
        onFavoriteSelect={(pair, isFilled) => this.favoriteSelect(pair, isFilled)}
      />
    )
  }

  render() {
    const {
      dark,
      label,
      onRemove,
      moveable,
      removeable,
      activeExchange,
      showChartMarket,
    } = this.props

    console.log('CHART PANEL props', this.props)

    const { currentMarket } = this.state

    return (
      <Panel
        dark={dark}
        label={label}
        darkHeader={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        showChartMarket={showChartMarket}
        chartMarketSelect={[
          showChartMarket && this.renderMarketDropdown(),
        ]}
        className='hfui-tradestable__wrapper'
      >
        <Chart
          market={currentMarket}
          exchange={activeExchange}
        />
      </Panel>
    )
  }
}
