const load = () => ({
  type: 'REST',
  meta: {
    url: '/api-key',
    method: 'GET',
    handler: 'API_KEY',
  },

  payload: {},
})

const submit = ({ key, secret } = {}) => ({
  type: 'REST',
  meta: {
    url: '/api-key',
    method: 'POST',
    handler: 'API_KEY',
  },

  payload: {
    key,
    secret,
  },
})

const update = ({ key, secret } = {}) => ({
  type: 'REST',
  meta: {
    url: '/api-key-update',
    method: 'POST',
    handler: 'API_KEY',
  },

  payload: {
    key,
    secret,
  },
})

export default { load, submit, update }
