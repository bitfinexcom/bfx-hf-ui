export const parseKeyChannelType = (key) => {
  return key.split('~')[0].split('-')[1]
}

// i.e. "channel-ticker:symbol-tZRXUSD"
export const parseTickerKey = (key) => {
  const symPair = key.split('~')[1]
  const symbol = symPair.split('-')[1]

  return [symbol]
}

// i.e. "channel-book:symbol-tZRXUSD
export const parseBookKey = (key) => {
  const filterPairs = key.split('~')
  const symbol = filterPairs[1].split('-')[1]

  return [symbol]
}

// i.e. "channel-trades:symbol-tZRXUSD"
export const parseTradesKey = (key) => {
  const symPair = key.split('~')[1]
  const symbol = symPair.split('-')[1]

  return [symbol]
}

// i.e. "channel-candles:tf-1h:symbol-tEOSUSD"
export const parseCandlesKey = (key) => {
  const info = key.split('~')

  return [
    info[1].split('-')[1],
    info[2].split('-')[1]
  ]
}
