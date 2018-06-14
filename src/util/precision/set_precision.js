import _isFinite from 'lodash/isFinite'

export default (number = 0, decimals = 0) => {
  const n = +(number)

  return (_isFinite(n))
    ? n.toFixed(decimals)
    : number
}
