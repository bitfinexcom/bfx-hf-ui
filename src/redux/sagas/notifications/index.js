import { takeEvery } from 'redux-saga/effects'

import WSTypes from '../../constants/ws'
import isAPIErrorNotification from './is_api_error_notification'

export default function* () {
  yield takeEvery(WSTypes.DATA_NOTIFICATION, isAPIErrorNotification)
}
