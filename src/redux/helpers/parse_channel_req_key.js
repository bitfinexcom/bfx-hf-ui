export const parseKeyChannelType = (key) => {
  return key.split('~')[0].split('-')[1]
}

// i.e. "channel-ticker:symbol-tZRXUSD"
export const parseTickerKey = (key) => {
  const symPair = key.split('~')[1]
  const symbol = symPair.split('-')[1]

  return [symbol]
}
