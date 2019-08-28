import { takeEvery } from 'redux-saga/effects'
import onError from './on_error'

export default function * () {
  yield takeEvery('HF_AS_ERROR_MESSAGE', onError)
}
