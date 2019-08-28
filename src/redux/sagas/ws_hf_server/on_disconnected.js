import { put } from 'redux-saga/effects'
import BFXDataActions from '../../actions/bfx_data'

export default function * () {
  yield put(BFXDataActions.clearChannels())
}
