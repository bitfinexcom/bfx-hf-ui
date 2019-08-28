exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.text('bitfinexAPIKey')
    t.text('bitfinexAPISecret')
    t.text('bitfinexAPIControl')

    t.text('binanceAPIKey')
    t.text('binanceAPISecret')
    t.text('binanceAPIControl')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('bitfinexAPIKey')
    t.dropColumn('bitfinexAPISecret')
    t.dropColumn('bitfinexAPIControl')

    t.dropColumn('binanceAPIKey')
    t.dropColumn('binanceAPISecret')
    t.dropColumn('binanceAPIControl')
  })
}
