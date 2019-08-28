'use strict'

const _includes = require('lodash/includes')
const EXAS = require('exchange_clients')

const IDS = EXAS.map(exa => exa.id)

module.exports = exID => _includes(IDS, exID)
