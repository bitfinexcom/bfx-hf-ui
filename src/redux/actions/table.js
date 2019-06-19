function changeStatus(index) {
  return {
    type: 'CHANGE_STATUS',
    index,
  }
}

export default {
  changeStatus,
}
