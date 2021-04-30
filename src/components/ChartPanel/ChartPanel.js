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
    layoutI: PropTypes.string.isRequired,
    addTradesRequirement: PropTypes.func,
    layoutID: PropTypes.string.isRequired,
    removeTradesRequirement: PropTypes.func,
    savedState: PropTypes.shape({
      currentMarket: PropTypes.shape({
        base: PropTypes.string,
        quote: PropTypes.string,
        restID: PropTypes.string,
      }),
      marketDirty: PropTypes.bool,
    }),
    markets: PropTypes.array, // eslint-disable-line
  }

  static defaultProps = {
    dark: true,
    label: null,
    markets: [],
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
    addTradesRequirement: () => {},
    removeTradesRequirement: () => {},
  }

  constructor(props) {
    super(props)

    const { savedState, activeMarket } = props
    const {
      marketDirty,
      currentMarket = activeMarket,
    } = savedState

    this.state = {
      marketDirty,
      currentMarket,
    }
  }

  componentDidMount() {
    const { addTradesRequirement } = this.props
    const { currentMarket } = this.state
    addTradesRequirement(currentMarket)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (!_isEqual(nextProps, this.props) || !_isEqual(nextState, this.state))
  }

  componentWillUnmount() {
    const { removeTradesRequirement } = this.props
    const { currentMarket } = this.state
    removeTradesRequirement(currentMarket)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      marketDirty,
      currentMarket,
    } = prevState

    const {
      activeMarket,
      addTradesRequirement,
      removeTradesRequirement,
    } = nextProps

    if (marketDirty || (activeMarket.restID === currentMarket.restID)) {
      return {}
    }

    removeTradesRequirement(currentMarket)
    addTradesRequirement(activeMarket)

    return {
      currentMarket: activeMarket,
    }
  }

  onChangeMarket = (market) => {
    const { currentMarket } = this.state
    const {
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

    removeTradesRequirement(currentMarket)
    addTradesRequirement(market)
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
    } = this.state

    saveState(layoutID, layoutI, {
      currentMarket,
      marketDirty,
    })
  }

  renderMarketDropdown() {
    const { markets, canChangeMarket } = this.props
    const { marketDirty, currentMarket } = this.state

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
        <Chart market={currentMarket} />
      </Panel>
    )
  }
}
