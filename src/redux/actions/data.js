const updateGithubAppVersion = () => ({
  type: 'REST_EXTERNAL',
  meta: {
    url: 'https://raw.githubusercontent.com/bitfinexcom/bfx-hf-ui/master/package.json',
    method: 'GET', // axios method
    handler: 'APP_DATA',
  },
})

const getCandlesHistory = (url) => ({
  type: 'REST_EXTERNAL',
  meta: {
    url,
    method: 'GET',
    handler: 'FETCH_CANDLES_HISTORY',
  },
})

export {
  updateGithubAppVersion,
  getCandlesHistory,
}
