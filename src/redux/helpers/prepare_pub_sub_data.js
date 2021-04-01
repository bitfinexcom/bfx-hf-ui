export const prepareTickerData = (data = []) => ({
  bid: data[0],
  ask: data[2],
  dailyChange: data[4],
  dailyChangePerc: data[5],
  lastPrice: data[6],
  volume: data[7],
  high: data[8],
  low: data[9],
})
