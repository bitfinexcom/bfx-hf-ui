'use strict'

const MAP = {
  '1m': 'one_minute',
  '3m': 'three_minutes',
  '5m': 'five_minutes',
  '15m': 'fifteen_minutes',
  '30m': 'thirty_minutes',
  '1h': 'one_hour',
  '2h': 'two_hours',
  '4h': 'four_hours',
  '6h': 'six_hours',
  '8h': 'eight_hours',
  '12h': 'twelve_hours',
  '1d': 'one_day',
  '3d': 'three_days',
  '1w': 'one_week',
  '1M': 'one_month'
}

module.exports = tf => MAP[tf]
