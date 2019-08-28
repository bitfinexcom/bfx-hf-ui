exports.up = function (knex, Promise) {
  return knex.schema.createTable('strategies', function (table) {
    table.increments('id')

    table.integer('owner').unsigned().notNullable()
    table.foreign('owner').references('id').inTable('users')

    table.text('label').notNullable()
    table.text('cryptedLabel').notNullable()

    table.text('defineIndicators').notNullable()
    table.text('onPriceUpdate').notNullable()
    table.text('onEnter').notNullable()
    table.text('onUpdate').notNullable()
    table.text('onUpdateLong').notNullable()
    table.text('onUpdateShort').notNullable()
    table.text('onUpdateClosing').notNullable()
    table.text('onPositionOpen').notNullable()
    table.text('onPositionUpdate').notNullable()
    table.text('onPositionClose').notNullable()
    table.text('onStart').notNullable()
    table.text('onStop').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('strategies')
}
