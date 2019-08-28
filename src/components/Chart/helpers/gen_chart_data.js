import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'

export default (candles = []) => {
  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor(c => new Date(c.mts))

  const {
    data, xScale, displayXAccessor, xAccessor,
  } = xScaleProvider(candles)

  return {
    data,
    xScale,
    displayXAccessor,
    xAccessor
  }
}
