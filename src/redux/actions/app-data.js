const lastAppVersion = () => ({
    type: 'REST_EXTERNAL',
    meta: {
      url: 'https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json',
      method: 'GET',
      handler: 'APP_DATA',
    }
  })

  export { lastAppVersion }