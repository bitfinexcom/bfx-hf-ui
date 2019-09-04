/* eslint-disable */

import React from 'react'
import ReactDOM from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Debug from 'debug'
import Manifest from '../package.json'

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
    location.reload()
  } else {
    debug('local storage DB version %s', version)
  }
}

debug('boot version %s', Manifest.version)

import HFUI from './components/HFUI'
import StoreWrapper from './StoreWrapper'

import './passive_listener_fix'
import './index.css'

ReactDOM.render((
  <Scrollbars
    style={{
      height: '100%',
    }}
  >
    <StoreWrapper>
      <HFUI />
    </StoreWrapper>
  </Scrollbars>
), document.getElementById('root'))
