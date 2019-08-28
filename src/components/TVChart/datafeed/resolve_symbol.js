import RESOLUTIONS from '../../../util/resolutions'

export default (component) => (symbol, cb, errCB) => {
  const tokens = symbol.split(':')
  const exID = tokens[0]
  const name = tokens[1]

  setTimeout(() => {
    cb({
      name,
      exchange: exID,
      listed_exchange: exID,
      description: name,
      session: '24x7',
      timezone: 'Etc/UTC',
      minmovement: 1,
      pricescale: 100000000,
      minmovement2: 0,
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: true,
      has_empty_bars: false,
      data_status: 'streaming',
      supported_resolutions: RESOLUTIONS[exID.toLowerCase()],
    })
  }, 0)
}
