import Request from 'request-promise'

const TV_URL = process.env.REACT_APP_TV_URL

export default (component) => (symbolInfo, resolution, from, to, cb, errCB, firstReq) => {
  const exchange = symbolInfo.exchange.toLowerCase()
  const { name } = symbolInfo

  Request({
    method: 'POST',
    uri: TV_URL,
    json: true,
    body: {
      exchange,
      symbol: name.split('/').join(''),
      resolution,
      from,
      to,
    }
  }).then((res) => {
    cb(res)
  }).catch((e) => {
    errCB('Internal server error')
  })
}
