'use strict'

module.exports = (chanData = []) => {
  const [ type ] = chanData

  switch (type) {
    case 'candles': { // ['candles', '1m', 'tEOSUSD']
      return `trade:${chanData[1]}:${chanData[2].w}`
    }

    case 'ticker': // ['ticker', 'tEOSUSD']
    case 'trades': { // ['trades', 'tEOSUSD']
      return chanData[1].w
    }

    case 'book': { // ['book', 'tEOSUSD']
      return [chanData[1].w, 'P0', '25'] // prec/len hardcoded for cross-compat
    }

    default: {
      return null
    }
  }
}
