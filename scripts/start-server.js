process.env.DEBUG = 'bfx:hf:*'

/* eslint-disable */
require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:api-server')
const _isString = require('lodash/isString')
const CORS = require('cors')
const Express = require('express')
const BodyParser = require('body-parser')
const LevelUp = require('levelup')
const LevelDown = require('leveldown')
const { connectDB } = require('bfx-hf-models')
const { RESTv2 } = require('bfx-api-node-rest')
const HFServer = require('bfx-hf-server')
const SocksProxyAgent = require('socks-proxy-agent')
const requestProxy = require('express-request-proxy')
/* eslint-enable */

const {
  SOCKS_PROXY_URL, REST_URL, WS_URL,
} = process.env

const API_PORT = process.env.API_PORT || '9987'

const run = async () => {
  // await startDB(`${__dirname}/db-mongo`)
  await connectDB('hf-ui-api')

  const db = LevelUp(LevelDown(`${__dirname}/../db`))
  const app = Express()

  app.use(CORS())
  app.use(BodyParser.json())

  let hfServer = null
  let restAPI = null

  const startHFServer = () => {
    if (hfServer) {
      hfServer.close()
    }

    db.get('api:key', (error, key) => {
      if (error) {
        return
      }

      db.get('api:secret', (error2, secret) => {
        if (error2) {
          return
        }

        restAPI = new RESTv2({
          apiKey: key.toString(),
          apiSecret: secret.toString(),
          agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
          url: REST_URL,
        })

        hfServer = new HFServer({
          apiKey: key.toString(),
          apiSecret: secret.toString(),
          transform: true,
          proxy: true,
          asPort: 9999,
          dsPort: 8899,
          port: 10000,
          agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
          restURL: REST_URL,
          wsURL: WS_URL,
        })
      })
    })
  }

  app.get('/api-key', (req, res) => {
    db.get('api:key', (error, key) => {
      if (error && !/not found/.test(error.message)) {
        res.status(500).json({ error: error.message })
        return
      }

      db.get('api:secret', (error2, secret) => {
        if (error2 && !/not found/.test(error2.message)) {
          res.status(500).json({ error: error2.message })
          return
        }

        res.json({
          key: key ? key.toString() : null,
          secret: secret ? secret.toString() : null,
        })
      })
    })
  })

  app.post('/api-key', (req, res) => {
    const { key, secret } = req.body

    if (!_isString(key)) {
      return res.status(400).json({ error: 'No API key provided' })
    }

    if (!_isString(secret)) {
      return res.status(400).json({ error: 'No API secret provided' })
    }

    return db.put('api:key', key, (error) => {
      if (error) {
        res.status(500).json({ error: error.message })
        return
      }

      db.put('api:secret', secret, (error2) => {
        if (error2) {
          res.status(500).json({ error: error.message })
          return
        }

        startHFServer()

        res.json({ key, secret })
      })
    })
  })

  app.post('/reconnect-bfx', (req, res) => {
    // startHFServer()
    res.status(200)
  })

  app.get('/v2/tickers', requestProxy({
    url: 'https://www.bitfinex.com/v2/tickers',
  }))

  app.get('/v2/auth/r/settings', requestProxy({
    url: 'https://www.bitfinex.com/v2/auth/r/settings',
  }))

  // app.post('/v2/auth/r/orders/hist', requestProxy({
  //   url: 'https://www.bitfinex.com/v2/auth/r/orders/hist',
  // }))

  app.post('/v2/auth/r/orders/hist', async (req, res) => {
    if (restAPI === null) {
      return res.status(503).json({ error: 'REST API unavailable' })
    }

    const { limit, end = Date.now() } = req.query
    const data = await restAPI.orderHistory(null, null, end, +limit)

    return res.json(data)
  })

  app.post('/v2/auth/r/orders/:sym/hist', async (req, res) => {
    if (restAPI === null) {
      return res.status(503).json({ error: 'REST API unavailable' })
    }

    const { sym } = req.params
    const { limit, end = Date.now() } = req.query
    const data = await restAPI.orderHistory(sym, null, end, limit)

    return res.json(data)
  })

  startHFServer()
  app.listen(API_PORT)

  debug(`server listening on port ${API_PORT}`)
}

try {
  run()
} catch (e) {
  debug('error: %s', e.message)
}
