'use strict'

const HFDB = require('bfx-hf-models')
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const {
  AOAdapter,
  schema: HFDBBitfinexSchema
} = require('bfx-hf-ext-plugin-bitfinex')

const initAOHost = require('util/init_ao_host')

module.exports = (server, apiKey, apiSecret) => {
  const { hfPSQLConnectionURL } = server

  return initAOHost({
    adapter: new AOAdapter({ apiKey, apiSecret, dms: 4 }),
    db: new HFDB({
      schema: HFDBBitfinexSchema,
      adapter: HFDBSQLAdapter({
        connection: hfPSQLConnectionURL,
        clientType: 'pg'
      })
    })
  })
}
