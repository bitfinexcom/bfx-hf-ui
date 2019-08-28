/* eslint-env mocha */
'use strict'

const _sample = require('lodash/sample')
const assertCandle = require('./assert_candle')
const assertTicker = require('./assert_ticker')
const assertTrade = require('./assert_trade')
const assertBook = require('./assert_book')
const testPoolRecvData = require('./test_pool_recv_data')

module.exports = (exID, markets, timeoutMS) => {
  describe(`ex_pool: recv ${exID} data`, function () {
    this.timeout(timeoutMS)

    it('connects and reports a ticker channel', (done) => {
      testPoolRecvData(done, exID, [
        ['ticker', _sample(markets)]
      ], [
        assertTicker
      ])
    })

    it('connects and reports multiple ticker channels', (done) => {
      testPoolRecvData(done, exID, [
        ['ticker', _sample(markets)],
        ['ticker', _sample(markets)]
      ], [
        assertTicker,
        assertTicker
      ])
    })

    it('connects and reports a candle channel', (done) => {
      testPoolRecvData(done, exID, [
        ['candles', '1m', _sample(markets)]
      ], [
        assertCandle
      ])
    })

    it('connects and reports multiple candle channels', (done) => {
      testPoolRecvData(done, exID, [
        ['candles', '1m', _sample(markets)],
        ['candles', '1m', _sample(markets)]
      ], [
        assertCandle,
        assertCandle
      ])
    })

    it('connects and reports a trade channel', (done) => {
      testPoolRecvData(done, exID, [
        ['trades', _sample(markets)]
      ], [
        assertTrade
      ])
    })

    it('connects and reports a book channel', (done) => {
      testPoolRecvData(done, exID, [
        ['book', _sample(markets)]
      ], [
        assertBook
      ])
    })

    it('connects and reports mixed channels', (done) => {
      testPoolRecvData(done, exID, [
        ['ticker', _sample(markets)],
        ['ticker', _sample(markets)],
        ['trades', _sample(markets)],
        ['trades', _sample(markets)],
        ['candles', '1m', _sample(markets)],
        ['candles', '1m', _sample(markets)],
        ['book', _sample(markets)],
        ['book', _sample(markets)]
      ], [
        assertTicker,
        assertTicker,
        assertTrade,
        assertTrade,
        assertCandle,
        assertCandle,
        assertBook,
        assertBook
      ])
    })
  })
}
