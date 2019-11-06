import defineIndicators from './defineIndicators'

import onEnter from './onEnter'
import onUpdateLong from './onUpdateLong'
import onUpdateShort from './onUpdateShort'

export default {
  label: 'VWAP ETH/USD Example',

  defineIndicators,
  onEnter,
  onUpdateLong,
  onUpdateShort,
}
