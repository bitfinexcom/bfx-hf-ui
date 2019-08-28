'use strict'

const bookTransformer = require('../transformers/book')
const propagateData = require('../propagate_data')

module.exports = (exa, chanID, book) => {
  propagateData(exa, chanID, ['full', bookTransformer(book)])
}
