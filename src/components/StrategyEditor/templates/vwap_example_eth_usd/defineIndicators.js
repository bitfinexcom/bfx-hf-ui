export default `(I) => {
  const indicators = {
  	vwap: new I.VWAP(),
    s: new I.EMA([100, 'high']),
    l: new I.EMA([600, 'low']),
    roc: new I.ROC([40]),
    rocS: new I.ROC([5]),
  }
  
  indicators.vwap.color = '#ff0000'
  indicators.s.color = '#00ffff'
    
  return indicators
}`
