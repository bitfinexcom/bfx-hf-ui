/* eslint-disable */

import React from 'react'
import ReactDOM from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Debug from 'debug'
import Manifest from '../package.json'

const debug = Debug('dtc:main')
const LOCAL_STORAGE_VERSION_KEY = 'DTC_LS_VERSION'
const LOCAL_STORAGE_VERSION = 9

if (localStorage) {
  const version = +localStorage.getItem(LOCAL_STORAGE_VERSION_KEY)

  if (!version || version < LOCAL_STORAGE_VERSION) {
    localStorage.clear()
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, LOCAL_STORAGE_VERSION)
    localStorage.debug = 'dtc:*'
    debug('local storage version mis-match, cleared')
    location.reload()
  } else {
    debug('local storage DB version %s', version)
  }
}

debug('boot version %s', Manifest.version)

import DTC from './components/DTC'
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
      <DTC />
    </StoreWrapper>
  </Scrollbars>
), document.getElementById('root'))
