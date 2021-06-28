import React, { memo, useState, useEffect } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import NavbarButton from '../Navbar/Navbar.Link'
import MANIFEST from '../../../package.json'
import './style.css'

const StatusBar = ({
  wsConnected, remoteVersion, apiClientState, wsInterrupted,
}) => {
  const [wsConnInterrupted, setWsConnInterrupted] = useState(false)
  const apiClientConnected = apiClientState === 2
  const apiClientConnecting = apiClientState === 1
  const apiClientDisconnected = !apiClientState

  useEffect(() => {
    if (wsInterrupted && !wsConnInterrupted) {
      setWsConnInterrupted(true)
    }
  }, [wsInterrupted])

  return (
    <div className='hfui-statusbar__wrapper'>
      <div className='hfui-statusbar__left'>
        <p>
          {remoteVersion && remoteVersion !== MANIFEST.version && (
            <NavbarButton
              label='Update to latest version'
              external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
            />
          )}
          &nbsp;
          v
          {MANIFEST.version}
        </p>

        <p>
          {apiClientConnected ? 'UNLOCKED' : 'LOCKED'}
        </p>
      </div>

      <div className='hfui-statusbar__right'>
        <p>
          {apiClientConnected && 'HF Connected'}
          {apiClientConnecting && 'HF Connecting'}
          {apiClientDisconnected && 'HF Disconnected'}
        </p>

        <span className={ClassNames('hfui-statusbar__statuscircle', {
          green: apiClientConnected,
          yellow: apiClientConnecting,
          red: apiClientDisconnected,
        })}
        />

        <p>{(wsConnected && !wsConnInterrupted) ? 'WS Connected' : 'WS Disconnected'}</p>

        <span className={ClassNames('hfui-statusbar__statuscircle', {
          green: wsConnected && !wsConnInterrupted,
          red: !wsConnected || wsConnInterrupted,
        })}
        />
      </div>
    </div>
  )
}

StatusBar.propTypes = {
  wsConnected: PropTypes.bool.isRequired,
  remoteVersion: PropTypes.string,
  apiClientState: PropTypes.number.isRequired,
  wsInterrupted: PropTypes.bool.isRequired,
}

StatusBar.defaultProps = {
  remoteVersion: '',
}

export default memo(StatusBar)
