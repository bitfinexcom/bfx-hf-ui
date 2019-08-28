import React from 'react'
import _isEqual from 'lodash/isEqual'
import DataFeed from './datafeed'
import RES_TO_TF from '../../util/resolution_to_tf'
import {
  widget
} from '../../local_modules/tv_charting_library/charting_library/charting_library.min'

const DEFAULT_INTERVAL = '1'
const DEFAULT_TF = '1m'
const LIBRARY_PATH = '/tv_charting_library/charting_library/'
const CLIENT_ID = 'datsusara-crypto.com'

export default class TVChart extends React.Component {
	tvWidget = null
	
	constructor (props) {
		super(props)

		const { activeExchange, activeMarket } = props

		this.tvWidget = null
		this.tvWidgetReady = false
		this.tvWidgetPositionLine = null
		this.tvWidgetOrderLines = []
		this.candleRequirement = null
		this.state = {
			exID: activeExchange,
			market: activeMarket,
			interval: DEFAULT_INTERVAL,
			tf: DEFAULT_TF,
			positionLine: null,
			lastCandle: null,
			orderLines: [],
		}
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		const {
			activeExchange, activeMarket, positions, atomicOrders, candles
		} = nextProps

		const exID = activeExchange
		const market = activeMarket

		const positionsForExchange = positions[exID] || {}
		const positionForMarket = positionsForExchange[market.r]
		const positionLine = positionForMarket ? {
			price: positionForMarket.basePrice,
			amount: positionForMarket.amount,
		} : null

		const ordersForExchange = atomicOrders[exID] || {}
		const ordersForMarket = Object.values(ordersForExchange).filter(o => (
			o.symbol === market.r
		))

		const orderLines = ordersForMarket.map(o => ({
			price: o.price,
			amount: o.amount,
		}))

		const { interval } = prevState
		const candlesForExchange = candles[exID] || {}
		const newTF = (RES_TO_TF[exID] || {})[interval]
		let lastCandle = prevState.lastCandle
		let tf = prevState.tf

		if (newTF) {
			tf = newTF
			const candlesForMarketTF = candlesForExchange[`${tf}:${market.u}`] || {}
			const candleMTSs = Object.keys(candlesForMarketTF)

			candleMTSs.sort((a, b) => +b - +a)

			if (candleMTSs[0]) {
				lastCandle = candlesForMarketTF[candleMTSs[0]]
			}
		}

		return { exID, market, positionLine, orderLines, lastCandle, tf }
	}

	componentDidUpdate (prevProps, prevState) {
		if (
			_isEqual(prevState.lastCandle, this.state.lastCandle) &&
			_isEqual(prevState.positionLine, this.state.positionLine) &&
			_isEqual(prevState.orderLines, this.state.orderLines) &&
			_isEqual(prevState.market, this.state.market) &&
			(prevState.exID === this.state.exID)
		) {
			return
		}

		if (!this.tvWidgetReady) {
			return
		}

		const { positionLine, orderLines, lastCandle } = this.state

		if (!_isEqual(prevState.positionLine, positionLine)) {
			if (this.tvWidgetPositionLine) {
				this.tvWidgetPositionLine.remove()
				this.tvWidgetPositionLine = null
			}


			if (positionLine) {
				this.tvWidgetPositionLine = this.tvWidget.chart().createPositionLine()
				this.tvWidgetPositionLine.setQuantity(`${positionLine.amount}`)
				this.tvWidgetPositionLine.setPrice(positionLine.price)
			}
		}

		if (!_isEqual(prevState.orderLines, orderLines)) {
			// Remove excess order lines
			if (this.tvWidgetOrderLines.length > orderLines.length) {
				const linesToRemove = this.tvWidgetOrderLines.splice(orderLines.length)
				linesToRemove.forEach(line => line.remove())
			}

			// Add new order lines
			while (this.tvWidgetOrderLines.length < orderLines.length) {
				this.tvWidgetOrderLines.push(this.tvWidget.chart().createOrderLine())
			}

			// Update all order lines
			orderLines.forEach((line, i) => {
				this.tvWidgetOrderLines[i].setPrice(line.price)
				this.tvWidgetOrderLines[i].setQuantity(`${line.amount}`)
			})
		}

		if (
			!_isEqual(prevState.market, this.state.market) ||
			(prevState.exID !== this.state.exID)
		) {
			const symbol = `${this.state.exID.toUpperCase()}:${this.state.market.u}`

			if (this.tvWidget.chart().symbol() !== symbol) {
				this.tvWidget.chart().setSymbol(symbol)
			}
		}

		if (
			!_isEqual(prevState.lastCandle, lastCandle) &&
			(this.candleRequirement && this.candleListener)
		) {
			const { exID, market, tf } = this.candleRequirement

			if (
				(exID === this.state.exID) &&
				(market.u === this.state.market.u) &&
				(tf === this.state.tf)
			) {
				this.candleListener({
					open: +lastCandle.open,
					high: +lastCandle.high,
					low: +lastCandle.low,
					close: +lastCandle.close,
					volume: +lastCandle.volume,
					time: lastCandle.mts,
				})
			}
		}
	}

	componentDidMount() {
    const {
			containerID, activeExchange, activeMarket, onChangeExchangeMarket,
		} = this.props

		this.tvWidget = new widget({
			symbol: `${activeExchange.toUpperCase()}:${activeMarket.u}`,
			datafeed: DataFeed(this),
			interval: DEFAULT_INTERVAL,
			container_id: containerID,
      library_path: LIBRARY_PATH,
      theme: 'Dark',

			locale: 'en',
			// disabled_features: ['use_localstorage_for_settings'],
			// enabled_features: ['study_templates'],
			// charts_storage_url: this.props.chartsStorageUrl,
			// charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: CLIENT_ID,
			user_id: null, // this.props.userId,
			fullscreen: false,
			autosize: true,
    })

    this.tvWidget.onChartReady(() => {
			this.tvWidgetReady = true
			this.tvWidget.chart().onSymbolChanged().subscribe(this, (symbol) => {
				const { markets } = this.props
				const exID = symbol.exchange.toLowerCase()
				const marketU = symbol.name
				const market = (markets[exID] || {}).find(m => m.u === marketU)

				if (market) {
					onChangeExchangeMarket(exID, market)
				}
			})

			this.tvWidget.chart().onIntervalChanged().subscribe(this, (interval) => {
				this.setState(() => ({ interval }))
			})
    })
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove()
			this.tvWidget = null
			this.tvWidgetReady = null
			this.tvWidgetPositionLine = null
			this.tvWidgetOrderLines = []
		}
	}

  render () {
    const { containerID } = this.props

    return (
      <div id={containerID} />
    )
  }
}
