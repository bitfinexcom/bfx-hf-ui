import { put, delay } from 'redux-saga/effects'
import Debug from 'debug'
import Request from 'request-promise'

import UIActions from '../../actions/ui'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // 1hr
const REMOTE_MANIFEST_URL = 'https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json'

const debug = Debug('hfui:rx:s:ws-hfui:worker-fetch-remote-version')

/**
 * Stores the latest app version number from **Github** in the store on an
 * interval.
 *
 * @generator
 */
export default function* () {
  while (true) {
    let remoteManifestData

    try {
      remoteManifestData = yield Request(REMOTE_MANIFEST_URL)
    } catch (err) {
      debug('failed to fetch remote manifest: %s', err.message)
      return
    }

    const { version } = remoteManifestData

    yield put(UIActions.saveRemoteVersion(version))
    yield delay(CHECK_INTERVAL_MS)
  }
}
