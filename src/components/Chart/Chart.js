import React from 'react'

import PropTypes from 'prop-types'

const CHART_URL = 'https://bitfinexcom.github.io/bfx-hf-tradingview'
function Chart(props) {
  const { market } = props
  const { wsID, base, quote } = market
  return (
    <iframe
      src={`${CHART_URL}/?wsID=${wsID}&base=${base}&quote=${quote}`}
      title='thumbnails'
      frameBorder='0'
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}

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
