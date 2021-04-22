import { put, delay } from 'redux-saga/effects'
import _head from 'lodash/head'
import _replace from 'lodash/replace'
import Debug from 'debug'
import Request from 'request-promise'

import UIActions from '../../actions/ui'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // 1hr
const REMOTE_MANIFEST_URL = 'https://api.github.com/repos/bitfinexcom/bfx-hf-ui/tags?per_page=1'

const debug = Debug('hfui:rx:s:ws-hfui:worker-fetch-remote-version')

export default function* () {
  while (true) {
    let remoteManifestData

    try {
      const manifest = yield Request(REMOTE_MANIFEST_URL)
      remoteManifestData = JSON.parse(manifest)
    } catch (err) {
      debug('failed to fetch remote manifest: %s', err.message)
      return
    }

    let { name } = _head(remoteManifestData)
    name = _replace(name, 'v', '')

    yield put(UIActions.saveRemoteVersion(name))
    yield delay(CHECK_INTERVAL_MS)
  }
}
