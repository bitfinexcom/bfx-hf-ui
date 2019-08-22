import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import HfServerConsts from '../constants/rest-hf-server'

const orderLabels = {
  'bfx-accumulate_distribute': 'Accumulate/Distribute',
  'bfx-twap': 'TWAP',
  'bfx-iceberg': 'Iceberg',
  'bfx-ping_pong': 'Ping/Pong',
}

const stopOrder = (gId) => {
  return (dispatch) => {
    return axios.get(`${HfServerConsts.HOST}/v1/orders/${gId}/stop`)
      .then((response) => {
        console.log(gId)
        NotificationManager.success('Order stoped')
        dispatch({
          type: 'RECEIVE_ORDERS',
          payload: Object.values(response.data).map((v) => {
            return [
              v.gid,
              v.algoID,
              v.active,
              v.state,
            ]
          }),
        })
      })
      .catch((error) => {
        // failed
        NotificationManager.error('Stop status error')
        console.error(error)
      })
      .finally(() => {
        dispatch({ type: 'RECEIVE_ORDERS_DONE' })
      })
  }
}

const runOrder = (gId) => {
  return (dispatch) => {
    return axios.get(`${HfServerConsts.HOST}/v1/orders/${gId}/activate`)
      .then((response) => {
        NotificationManager.success('Order now running')
        dispatch({
          type: 'RECEIVE_ORDERS',
          payload: Object.values(response.data).map((v) => {
            return [
              v.gid,
              v.algoID,
              v.active,
              v.state,
            ]
          }),
        })
      })
      .catch((error) => {
        // failed
        NotificationManager.error('Run status error')
        console.error(error)
      })
      .finally(() => {
        dispatch({ type: 'RECEIVE_ORDERS_DONE' })
      })
  }
}

function changeStatus(id, isActive) {
  return (dispatch) => {
    return axios.post(`${HfServerConsts.HOST}/v1/definitions/${id}/state/set`, { active: isActive })
      .then((response) => {
        NotificationManager.success(`${orderLabels[id]} ${isActive ? 'activated' : 'stopped'}`)
        dispatch({
          type: 'RECEIVE_ALGO_DATA',
          payload: response.data,
        })
      })
      .catch((error) => {
        // failed
        NotificationManager.error('Change status error', JSON.stringify(error))
        console.error(error)
      })
      .finally(() => {
        dispatch({ type: 'RECEIVE_ALGO_DATA_DONE' })
      })
  }
}

function getAlgoData() {
  return {
    type: 'GET_ALGO_DATA',
  }
}

function receiveAlgoData() {
  return {
    type: 'RECEIVE_ALGO_DATA',
    payload: {
      data: [],
    },
  }
}

export default {
  stopOrder,
  runOrder,
  changeStatus,
  getAlgoData,
  receiveAlgoData,
}
