exports.up = function (knex, Promise) {
  return knex.schema.table('kraken_candles', function (t) {
    t.index(['symbol', 'tf', 'mts'])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('kraken_candles', function (t) {
    t.dropIndex(['symbol', 'tf', 'mts'])
  })
}
