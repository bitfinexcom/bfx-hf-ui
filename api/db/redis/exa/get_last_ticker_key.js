'use strict'

module.exports = (exchangeID) => {
  return `db.exa.data.tickers.${exchangeID}.last`
}
