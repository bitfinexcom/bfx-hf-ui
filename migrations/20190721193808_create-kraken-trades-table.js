exports.up = function (knex, Promise) {
  return knex.schema.createTable('kraken_trades', function (table) {
    table.increments('id')

    table.string('symbol', 10).notNullable()
    table.string('price', 20).notNullable()
    table.string('amount', 20).notNullable()
    table.string('mts', 24).unique().notNullable()
    table.string('context', 1).notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('kraken_trades')
}
