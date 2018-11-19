const load = () => {
  return {
    type: 'REST',
    meta: {
      url: '/api-key',
      method: 'GET',
      handler: 'API_KEY',
    },

    payload: {}
  }
}

const submit = ({ key, secret } = {}) => {
  return {
    type: 'REST',
    meta: {
      url: '/api-key',
      method: 'POST',
      handler: 'API_KEY',
    },

    payload: {
      key,
      secret
    }
  }
}

export default { load, submit }
