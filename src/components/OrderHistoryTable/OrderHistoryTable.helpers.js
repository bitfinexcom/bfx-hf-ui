const symbolToLabel = (symbol) => {
  if (symbol.includes(':')) {
    let [base, quote] = symbol.split(':') //eslint-disable-line
    if (base.includes('t')) {
      base = base.substring(1, base.length)
    }
    return `${base}/${quote}`
  }
  return `${symbol.substring(1, 4)}/${symbol.substring(4)}`
}
const getPriceFromStatus = (status) => {
  if (!status.includes('@')) {
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
