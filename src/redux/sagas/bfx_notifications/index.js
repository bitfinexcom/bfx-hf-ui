import { takeEvery } from 'redux-saga/effects'
import BFXDataTypes from '../../constants/bfx_data'
import onNewOrder from './on_new_order'
import onCloseOrder from './on_close_order'

export default function * () {
  yield takeEvery(BFXDataTypes.ORDER_NEW, onNewOrder)
  yield takeEvery(BFXDataTypes.ORDER_CLOSE, onCloseOrder)
}
