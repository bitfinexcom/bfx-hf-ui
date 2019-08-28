exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.text('cancelSubscriptionURL')
    t.text('updateBillingURL')
    t.integer('subscription').unsigned()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('cancelSubscriptionURL')
    t.dropColumn('updateBillingURL')
    t.dropColumn('subscription')
  })
}
