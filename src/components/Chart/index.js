import React from 'react'

import PropTypes from 'prop-types'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    const { market } = this.props
    const { wsID, base, quote } = market
    return (
      <iframe
        src={`https://antonnazarenko.github.io/bfx-hf-tradingview/?wsID=${wsID}&base=${base}&quote=${quote}`}
        title='thumbnails'
        frameBorder='0'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    )
  }
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

export default Chart
