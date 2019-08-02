
const HOST = 'http://localhost:7799'

function stopAlgoOrder(gid) {
  return {
    type: 'REST',
    meta: {
      url: `${HOST}/v1/orders/${gid}/stop`,
      method: 'GET',
      handler: 'REST_HF_SERVER',
    },
  }
}

export default {
  stopAlgoOrder,
}
