import { put, select  } from 'redux-saga/effects'
import { getPositions } from '../../selectors/bfx_data'
import WSHFActions from '../../actions/ws_hf_server'

export default function * () {
  const positions = yield select(getPositions)
  const channels = []

  Object.keys(positions).forEach(pSym => {
    channels.push([`position_${pSym}`])
  })

  yield put(WSHFActions.calc(channels))
}
