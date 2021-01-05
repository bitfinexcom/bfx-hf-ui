const updateGithubAppVersion = () => ({
  type: 'REST_EXTERNAL',
  meta: {
    url: 'https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json',
    method: 'GET', // axios method
    handler: 'APP_DATA',
  },
})

const getTOS = () => ({
  type: 'REST_EXTERNAL',
  meta: {
    url: 'https://raw.githubusercontent.com/bitfinexcom/bitfinex-terminal/master/terms-of-use/README.md',
    method: 'GET',
    handler: 'TOS_DATA',
  },
})

export { updateGithubAppVersion, getTOS }
