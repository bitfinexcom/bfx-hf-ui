import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider as UfxStoreProvider } from '@ufx-ui/core'
import { useInjectBfxData } from '@ufx-ui/bfx-containers'

import Debug from 'debug'
import Manifest from '../package.json'

import HFUI from './components/HFUI'
import CrashHandler from './components/CrashHandler'
import StoreWrapper from './StoreWrapper'

import './passive_listener_fix'
import './index.css'

const debug = Debug('hfui:main')
const LOCAL_STORAGE_VERSION_KEY = 'HFUI_LS_VERSION'
const LOCAL_STORAGE_VERSION = 2

if (localStorage) {
  const version = +localStorage.getItem(LOCAL_STORAGE_VERSION_KEY)

  if (!version || version < LOCAL_STORAGE_VERSION) {
    localStorage.clear()
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, LOCAL_STORAGE_VERSION)
    localStorage.debug = 'hfui:*'
    debug('local storage version mis-match, cleared')
    window.location.reload()
  } else {
    debug('local storage DB version %s', version)
  }
}

debug('boot version %s', Manifest.version)

const timezoneOffset = -(new Date().getTimezoneOffset())
const config = {
  timezoneOffset,
}

const HFUIWrapper = () => {
  useInjectBfxData()

  return (
    <CrashHandler>
      <HFUI />
    </CrashHandler>
  )
}

ReactDOM.render((
  <StoreWrapper>
    <UfxStoreProvider value={config}>
      <HFUIWrapper />
    </UfxStoreProvider>
  </StoreWrapper>
), document.getElementById('root'))
