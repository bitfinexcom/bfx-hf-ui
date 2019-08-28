import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import RESOLUTIONS from '../../../util/resolutions'

export default (component) => (cb) => {
  setTimeout(() => {
    cb({
      supported_resolutions: _uniq(_flatten(Object.values(RESOLUTIONS))),
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: false,
      symbols_types: [],
      exchanges: [{
        value: 'bitfinex',
        name: 'Bitfinex',
        desc: 'Bitfinex',
      }, {
        value: 'binance',
        name: 'Binance',
        desc: 'Binance',
      }]
    })
  }, 0)
}