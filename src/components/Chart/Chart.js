import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const CHART_URL = 'https://bitfinexcom.github.io/bfx-hf-tradingview'

const Chart = ({ market: { wsID, base, quote } }) => (
  <iframe
    className='hfui-chart-iframe'
    src={`${CHART_URL}/?wsID=${wsID}&base=${base}&quote=${quote}`}
    title='thumbnails'
  />
)

Chart.propTypes = {
  market: PropTypes.shape({
    wsID: PropTypes.string,
    base: PropTypes.string,
    quote: PropTypes.string,
  }),
}

Chart.defaultProps = {
  market: {
    base: 'BTC',
    quote: 'USD',
    wsID: 'tBTCUSD',
  },
}

export default React.memo(Chart)
