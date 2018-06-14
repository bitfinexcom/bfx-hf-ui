import setPrecision from './set_precision'

export default (price = 0) => {
  return setPrecision(price, 8)
}
