import _isEmpty from 'lodash/isEmpty'

export default (component) => (userInput, exchange, symbolType, cb) => {
  const { markets } = component.props
  const results = []
  const filterFunc = (query) => m => (
    m.u.toLowerCase().indexOf(query.toLowerCase()) !== -1
  )

  if (userInput.match(/:/) || !_isEmpty(exchange)) {
    const exID = (_isEmpty(exchange) ? userInput.split(':')[0] : exchange).toLowerCase()
    const uSymbol = _isEmpty(exchange) ? userInput.split(':')[1] : userInput

    const matches = Object
      .values(markets[exID] || {})
      .filter(filterFunc(uSymbol))
      .map(m => ({ exID, ...m }))
    
    results.push(...matches)
  } else {
    Object.keys(markets).forEach((exID) => {
      const matches = Object
        .values(markets[exID])
        .filter(filterFunc(userInput))
        .map(m => ({ exID, ...m }))
      
      results.push(...matches)
    })
  }

  cb(results.map(m => ({
    symbol: `${m.b}/${m.q}`,
    full_name: `${m.exID.toUpperCase()}:${m.b}/${m.q}`, // eslint-disable-line
    description: m.u,
    exchange: m.exID,
  })))
}
