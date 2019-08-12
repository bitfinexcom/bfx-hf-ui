import React from 'react'
import _uniq from 'lodash/uniq'
import _isEmpty from 'lodash/isEmpty'
import { Spinner } from '@blueprintjs/core'
import { version } from '../../../package.json'
import axios from 'axios'

import { propTypes, defaultProps } from './index.props'

const openGithub = (event) => {
  const { shell } = require('electron')
  event.preventDefault()
  shell.openExternal('https://github.com/bitfinexcom/bfx-hf-ui/releases')
}
export default class StatusBar extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps
  
  renderSyncStatus() {
    const { syncs = {} } = this.props

    if (_isEmpty(syncs)) {
      return null
    }

    const symbols = _uniq(Object
      .keys(syncs)
      .map(s => s.split(':')[0]))

    const sym = symbols.length === 1
      ? symbols[0]
      : `${symbols[0]} & ${symbols.length - 1} more`

    return (
      <p>
        <Spinner size={15} />
        Syncing
        {' '}
        {sym}
      </p>
    )
  }

   render() {
    const { status, version: lastVersion } = this.props
    return (
      <div className='statusbar__wrapper'>
        {this.renderSyncStatus()}
        <div>
          <span className='statusbar__version'>
            version:
            {' '}
            { version === lastVersion ? version : <a onClick={()=>openGithub} > {version} is outdated, please update HF</a> }
          </span>
          <div className='statusbar__right'>
            
            <div className={`statusbar_indicator ${status}`} />
          </div>
        </div>
      </div>
    )
  }
}
