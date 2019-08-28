exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')

    table.string('authToken', 64)
    table.string('username', 64).notNullable()
    table.string('password', 64).notNullable()
    table.string('email', 64).notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
