export default {
  load: () => ({
    type: 'REST',
    meta: {
      url: '/api-key',
      method: 'GET',
      handler: 'API_KEY',
    },

    payload: {}
  }),

  submit: ({ key, secret } = {}) => ({
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
  })
}
