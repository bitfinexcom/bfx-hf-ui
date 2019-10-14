const lastAppVersion = () => ({
  type: 'REST_EXTERNAL',
  meta: {
    url: 'https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json',
    method: 'GET', // axios method
    handler: 'APP_DATA',
  },
})

export { lastAppVersion }
