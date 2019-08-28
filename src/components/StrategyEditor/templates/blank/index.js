import defineIndicators from './defineIndicators'

import onEnter from './onEnter'
import onStart from './onStart'
import onStop from './onStop'
import onUpdate from './onUpdate'
import onUpdateLong from './onUpdateLong'
import onUpdateShort from './onUpdateShort'
import onUpdateClosing from './onUpdateClosing'
import onPriceUpdate from './onPriceUpdate'
import onPositionUpdate from './onPositionUpdate'
import onPositionOpen from './onPositionOpen'
import onPositionClose from './onPositionClose'

export default {
  label: 'Blank',

  defineIndicators,

  onEnter,
  onStart,
  onStop,
  onUpdate,
  onUpdateLong,
  onUpdateShort,
  onUpdateClosing,
  onPriceUpdate,
  onPositionUpdate,
  onPositionOpen,
  onPositionClose,
}
