'use strict'

const subscribe = require('./subscribe')
const onData = require('./on_data')
const ex = require('./ex')

ex.onData(onData)

module.exports = { subscribe }
