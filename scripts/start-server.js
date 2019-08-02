process.env.DEBUG = 'bfx:hf:*'

/* eslint-disable */
require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

// internal
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const { RESTv2 } = require('bfx-api-node-rest')
const HFDB = require('bfx-hf-models')
const hfDb = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBLowDBAdapter({
    dbPath: `${__dirname}/../db`,
    schema: HFDBBitfinexSchema
  })
})
const { Credential } = hfDb
const CRED_KEY = 'hf-ui-credentials'


// external
const debug = require('debug')('bfx:hf:api-server')
const _isString = require('lodash/isString')
const CORS = require('cors')
const Express = require('express')
const BodyParser = require('body-parser')
const HFServer = require('bfx-hf-server')
const SocksProxyAgent = require('socks-proxy-agent')
const requestProxy = require('express-request-proxy')
/* eslint-enable */

const {
  SOCKS_PROXY_URL, REST_URL, WS_URL,
} = process.env
const API_PORT = process.env.API_PORT || '9987'

const run = async () => {
  const app = Express()

  app.use(CORS())
  app.use(BodyParser.json())

  let hfServer = null
  let restAPI = null

  const startHFServer = async () => {
    if (hfServer) {
      hfServer.close()
    }
    const creds = await Credential.get(CRED_KEY)
    if (creds) {
      restAPI = new RESTv2({
        apiKey: creds.key,
        apiSecret: creds.secret,
        agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
        url: REST_URL,
      })
      hfServer = new HFServer({
        db: hfDb,
        apiKey: creds.key,
        apiSecret: creds.secret,
        transform: true,
        proxy: true,
        asPort: 9999,
        dsPort: 8899,
        hfPort: 7799,
        port: 10000,
        agent: SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null,
        restURL: REST_URL,
        wsURL: WS_URL,
      })
    }
  }

  app.get('/api-key', async (req, res) => {
    const creds = await Credential.get(CRED_KEY)
    if (!creds) {
      return res.status(200).json({ error: `Unable to find api credentials for id ${CRED_KEY}` })
    }
    return res.json({
      key: creds.key,
      secret: creds.secret,
    })
  })

  app.post('/api-key', async (req, res) => {
    const { key, secret } = req.body

    if (!_isString(key)) {
      return res.status(400).json({ error: 'No API key provided' })
    }

    if (!_isString(secret)) {
      return res.status(400).json({ error: 'No API secret provided' })
    }

    try {
      await Credential.create({
        cid: CRED_KEY,
        key,
        secret,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: error.message })
    }
    startHFServer()
    return res.json({ key, secret })
  })

  app.post('/api-key-update', async (req, res) => {
    const { key, secret } = req.body
    debug(key, secret)

    if (!_isString(key)) {
      return res.status(400).json({ error: 'No API key provided' })
    }

    if (!_isString(secret)) {
      return res.status(400).json({ error: 'No API secret provided' })
    }

    try {
      debug(await Credential.update(CRED_KEY, {
        cid: CRED_KEY,
        key,
        secret,
      }))
    } catch (error) {
      debug('===============', error)
      return res.status(500).json({ error: error.message })
    }
    startHFServer()
    return res.json({ key, secret })
  })

  app.post('/reconnect-bfx', async (req, res) => {
    await startHFServer()
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

  await startHFServer()
  app.listen(API_PORT)

  debug(`server listening on port ${API_PORT}`)
}

try {
  run()
} catch (e) {
  debug('error: %s', e.message)
}
