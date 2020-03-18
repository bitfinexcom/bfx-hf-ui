/* eslint-disable */

export default `(I) => {
  const indicators = {
  	emaL: new I.EMA([100, 'high']),
  	emaS: new I.EMA([10, 'low']),
  }

  indicators.emaL.color = '#00ff00'
  indicators.emaS.color = '#ff0000'

  return indicators
}`
