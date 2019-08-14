import axios from 'axios'
import HfServerConsts from '../constants/rest-hf-server'

const stopOrder = (gId) => {
  return (dispatch) => {
    return axios.get(`${HfServerConsts.HOST}/v1/orders/${gId}/stop`)
      .then((response) => {
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
        dispatch({
          type: 'RECEIVE_ALGO_DATA',
          payload: response.data,
        })
      })
      .catch((error) => {
        // failed
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
  changeStatus,
  getAlgoData,
  receiveAlgoData,
}
