exports.up = function (knex, Promise) {
  return knex.schema.createTable('kraken_candles', function (table) {
    table.increments('id')

    table.string('symbol', 10).notNullable()
    table.string('tf', 3).notNullable()
    table.string('open', 20).notNullable()
    table.string('high', 20).notNullable()
    table.string('low', 20).notNullable()
    table.string('close', 20).notNullable()
    table.string('volume', 32).notNullable()
    table.decimal('mts', null).notNullable()
    table.string('key', 31).notNullable().unique()
    table.integer('count').unsigned().notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('kraken_candles')
}
