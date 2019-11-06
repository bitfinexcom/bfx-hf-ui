import defineIndicators from './defineIndicators'
import defineMeta from './defineMeta'

import onEnter from './onEnter'
import onUpdateLong from './onUpdateLong'
import onUpdateShort from './onUpdateShort'

export default {
  label: 'Basic EMA Cross',

  defineIndicators,
  defineMeta,
  onEnter,
  onUpdateLong,
  onUpdateShort,
}
