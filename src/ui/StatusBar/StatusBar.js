import React from 'react'
import _uniq from 'lodash/uniq'
import _isEmpty from 'lodash/isEmpty'
import { Spinner } from '@blueprintjs/core'
import axios from 'axios'
import { version } from '../../../package.json'
// import { shell } from 'electron'

import { propTypes, defaultProps } from './index.props'

const openGithub = () => {
  window.location = 'https://github.com/bitfinexcom/bfx-hf-ui/releases'
}
// console.log(shell)
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
            { `version: ${version}` } 
          </span>
          <span className='update__btn'>
          { version !== lastVersion ? (
              <button type='button' className='hfui__add-order-btn'>
                {' '}
                <a style={{ color: 'white' }} href='https://github.com/bitfinexcom/bfx-hf-ui/releases'>
                  {`update to ${lastVersion}`}
                </a>
              </button>
) : null }
          </span>
          <div className='statusbar__right'>

            <div className={`statusbar_indicator ${status}`} />
          </div>
        </div>
      </div>
    )
  }
}
