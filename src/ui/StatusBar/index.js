import React from 'react'
import { Spinner } from '@blueprintjs/core'

import { propTypes, defaultProps } from './index.props'

import './style.css'

export default class StatusBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    return (
      <div className='statusbar__wrapper'>
        <p>
          <Spinner size={15} />
          Syncing BTC/USD (4/10)
        </p>
      </div>
    )
  }
}
