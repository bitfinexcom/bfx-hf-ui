exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.text('krakenAPIKey')
    t.text('krakenAPISecret')
    t.text('krakenAPIControl')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('krakenAPIKey')
    t.dropColumn('krakenAPISecret')
    t.dropColumn('krakenAPIControl')
  })
}
