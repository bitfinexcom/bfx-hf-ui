import React from 'react'
import _sum from 'lodash/sum'
import _uniq from 'lodash/uniq'
import _isEmpty from 'lodash/isEmpty'
import { Spinner } from '@blueprintjs/core'

import { propTypes, defaultProps } from './index.props'

import './style.css'

export default class StatusBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  renderSyncStatus () {
    const { syncs = {} } = this.props

    if (_isEmpty(syncs)) {
      return null
    }

    const symbols = _uniq(Object
      .keys(syncs)
      .map(s => s.split(':')[0]))

    const total = _sum(Object
      .values(syncs)
      .map(s => s.total))

    const curr = _sum(Object
      .values(syncs)
      .map(s => s.curr))

    const sym = symbols.length === 1
      ? symbols[0]
      : `${symbols[0]} & ${symbols.length - 1} more`

    return (
      <p>
        <Spinner size={15} />
        Syncing {sym} ({curr}/{total})
      </p>
    )
  }

  render () {
    return (
      <div className='statusbar__wrapper'>
        {this.renderSyncStatus()}
      </div>
    )
  }
}
