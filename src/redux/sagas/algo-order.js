import { call, put } from 'redux-saga'

import { receiveAlgoData } from '../actions/table'

async function fetchData() { 
    try {
        const data = await fetch('url')
        return data
    } catch(err) {

    }
}

export default function* getAlgoData () { 
    try { 
        const data  = yield call(fetchData())
        yield put(receiveAlgoData(data))

    } catch (err) {
        console.error(err)
    }
}