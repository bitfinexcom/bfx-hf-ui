function changeStatus(index) {
  return {
    type: 'CHANGE_STATUS',
    index,
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
      data: []
    }
  }
}

export default {
  changeStatus,
  getAlgoData,
  receiveAlgoData,
}
