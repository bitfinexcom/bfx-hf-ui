import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'

import Chart from '../Chart'
import MarketSelect from '../MarketSelect'

import Panel from '../../ui/Panel'

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
    canChangeMarket: PropTypes.bool,
    showChartMarket: PropTypes.bool,
    activeExchange: PropTypes.string,
    layoutI: PropTypes.string.isRequired,
    addTradesRequirement: PropTypes.func,
    layoutID: PropTypes.string.isRequired,
    removeTradesRequirement: PropTypes.func,
    savedState: PropTypes.shape({
      currentExchange: PropTypes.string,
      currentMarket: PropTypes.shape({
        base: PropTypes.string,
        quote: PropTypes.string,
        restID: PropTypes.string,
      }),
      marketDirty: PropTypes.bool,
      exchangeDirty: PropTypes.bool,
    }),
    allMarkets: PropTypes.objectOf(PropTypes.array),
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
    saveState: () => {},
    showChartMarket: false,
    canChangeMarket: false,
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
      currentMarket,
      currentExchange,
    } = prevState

    const {
      activeMarket,
      activeExchange,
      addTradesRequirement,
      removeTradesRequirement,
    } = nextProps

    if ((marketDirty) || (
      activeMarket.restID === currentMarket.restID
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

  renderMarketDropdown() {
    const { allMarkets, canChangeMarket } = this.props
    const { marketDirty, currentMarket, currentExchange } = this.state
    const markets = allMarkets[currentExchange] || []

    return (
      <MarketSelect
        markets={markets}
        renderWithFavorites
        key='market-dropdown'
        value={currentMarket}
        disabled={!canChangeMarket}
        onChange={this.onChangeMarket}
        className={{ yellow: marketDirty }}
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
