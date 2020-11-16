const symbolToLabel = (symbol) => {
  if (symbol.includes(':')) {
    const pair = symbol.split(':')
    return `${pair[0]}/${pair[1]}`
  }
  return `${symbol.substring(1, 4)}/${symbol.substring(4)}`
}
const getPriceFromStatus = (status) => {
  if (status.includes('CANCELED')) {
    return '0.00'
  }
  return `${status.split('@')[1].split('(')[0]}`
}
const getFormatedStatus = (status) => {
  return `${status.split('@')[0]}`
}
export {
  symbolToLabel,
  getPriceFromStatus,
  getFormatedStatus,
}