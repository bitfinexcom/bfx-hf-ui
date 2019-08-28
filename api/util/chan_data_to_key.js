'use strict'

module.exports = (channelData) => {
  let revisedChannelData = { type: channelData[0] }

  switch (channelData[0]) {
    case 'candles': {
      revisedChannelData.key = `trade:${channelData[1]}:${channelData[2].w || channelData[2].r}`
      break
    }

    case 'book':
    case 'trades':
    case 'ticker': {
      revisedChannelData.symbol = channelData[1].w || channelData[1].r
      break
    }
  }

  const keys = Object.keys(revisedChannelData)
  return keys.map(k => `${k}-${revisedChannelData[k]}`).join('|')
}
