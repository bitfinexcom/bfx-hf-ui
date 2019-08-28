'use strict'

module.exports = async ({ db, path, index, indexMatches, doc }) => {
  if (!index) {
    throw new Error('can\'t upsert, model missing index')
  }

  const insertSQL = db(path).insert(doc).toString()
  const whereRawSQL = indexMatches.map(fieldName => (
    `${path}.${fieldName} = '${doc[fieldName]}'`
  )).join(' AND ')

  const updateSQL = db
    .update(doc)
    .whereRaw(whereRawSQL)
    .toString()

  const query = [
    insertSQL,
    `ON CONFLICT (${index}) DO UPDATE SET`,
    updateSQL.replace(/^update\s.*\sset\s/i, '')
  ].join(' ')

  await db.raw(query)

  return doc
}
