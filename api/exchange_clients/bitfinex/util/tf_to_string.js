'use_strict'

const MAP = {
  '1m': 'one_minute',
  '5m': 'five_minutes',
  '15m': 'fifteen_minutes',
  '30m': 'thirty_minutes',
  '1h': 'one_hour',
  '3h': 'three_hours',
  '6h': 'six_hours',
  '12h': 'twelve_hours',
  '1D': 'one_day',
  '7D': 'seven_days',
  '14D': 'fourteen_days',
  '1M': 'one_month'
}

module.exports = tf => MAP[tf]
