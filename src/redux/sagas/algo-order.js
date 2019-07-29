import { call, put } from 'redux-saga'
import axios from 'axios'

import { receiveAlgoData } from '../actions/table'

async function fetchData() { 
    try {
        const data = await axios.post('http://localhost:9987/v2/getAlgos')
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