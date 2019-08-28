'use strict'

const cors = require('cors')
const http = require('http')
const Express = require('express')
const BodyParser = require('body-parser')
const _isFinite = require('lodash/isFinite')
const debug = require('debug')('dtc:api:tv-data-server')
const fetchBitfinex = require('db/query_candles/fetch_bitfinex')
const fetchBinance = require('db/query_candles/fetch_binance')

const RESOLUTIONS_BITFINEX = require('./resolutions_bitfinex')
const RESOLUTIONS_BINANCE = require('./resolutions_binance')

module.exports = ({ port }) => {
  const app = Express()
  const server = http.createServer(app)

  app.use(cors())
  app.use(BodyParser.json({ type: 'application/json' }))
  app.use(BodyParser.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.json({ version: 1 })
  })

  app.post('/', async (req, res) => {
    const { exchange, symbol, resolution, from, to } = req.body
    const parsedRes = resolution.length === 1 && !_isFinite(+resolution)
      ? `1${resolution}`
      : resolution

    const start = from * 1000
    const end = to * 1000
    let candles = []

    debug('recv candle req for %s %s @ %s', exchange, symbol, parsedRes)

    // TODO: add validation for resolution
    if (exchange === 'bitfinex') {
      const market = { r: `t${symbol}` }
      const tf = RESOLUTIONS_BITFINEX[parsedRes]
      candles = await fetchBitfinex({ market, tf, start, end })
    } else if (exchange === 'binance') {
      const market = { r: symbol }
      const tf = RESOLUTIONS_BINANCE[parsedRes]
      candles = await fetchBinance({ market, tf, start, end })
    }

    res.json(candles.map(c => ({
      open: +c.open,
      high: +c.high,
      low: +c.low,
      close: +c.close,
      time: c.mts,
      volume: +c.volume,
    })))
  })

  server.listen(port)
  debug('listening on port %s', port)
}
 