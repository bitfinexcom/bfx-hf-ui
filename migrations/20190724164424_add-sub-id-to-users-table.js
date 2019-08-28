exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.integer('subscriptionID').unsigned()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('subscriptionID')
  })
}
