import { takeEvery } from 'redux-saga/effects'
import types from '../../constants/market'
import getCCYFullNames from './get_ccy_full_names'

export default function* () {
  yield takeEvery(types.GET_CCY_FULL_NAMES, getCCYFullNames)
}
