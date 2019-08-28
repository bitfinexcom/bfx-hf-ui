'use strict'

module.exports = (exchangeID) => {
  return `db.exa.data.candles.${exchangeID}.last`
}
