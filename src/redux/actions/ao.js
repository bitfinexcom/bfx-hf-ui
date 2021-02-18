import types from '../constants/ao'

export function getActiveAlgoOrders() {
  return {
    type: types.GET_ACTIVE_AOS,
  }
}

export function setActiveAlgoOrders(activeAlgoOrders) {
  return {
    type: types.SET_ACTIVE_AOS,
    payload: activeAlgoOrders,
  }
}

export function showActiveOrdersModal(status) {
  return {
    type: types.SHOW_ACTIVE_AOS_MODAL,
    payload: status,
  }
}

export function handleActiveOrders(data) {
  return {
    type: types.HANDLE_ACTIVE_AOS,
    payload: data,
  }
}

export default {
  getActiveAlgoOrders,
  setActiveAlgoOrders,
  showActiveOrdersModal,
  handleActiveOrders,
}
