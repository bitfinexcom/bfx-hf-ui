'use strict'

const HFDB = require('bfx-hf-models')
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const {
  AOAdapter,
  schema: HFDBBinanceSchema
} = require('bfx-hf-ext-plugin-binance')

const initAOHost = require('util/init_ao_host')

module.exports = (server, apiKey, apiSecret) => {
  const { hfPSQLConnectionURL } = server

  return initAOHost({
    adapter: new AOAdapter({ apiKey, apiSecret }),
    db: new HFDB({
      schema: HFDBBinanceSchema,
      adapter: HFDBSQLAdapter({
        connection: hfPSQLConnectionURL,
        clientType: 'pg'
      })
    })
  })
}
