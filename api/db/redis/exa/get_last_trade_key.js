'use strict'

module.exports = (exchangeID) => {
  return `db.exa.data.trades.${exchangeID}.last`
}
