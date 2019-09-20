const QUOTE_PREFIX_MAP = {
  USD: '$',
  CNY: '¥',
  EUR: '€',
  JPY: '￥',
}

export default q => QUOTE_PREFIX_MAP[q] || ''
