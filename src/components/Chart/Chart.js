import React from 'react'
import PropTypes from 'prop-types'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

import './style.css'

const Chart = ({ market, exchange }) => {
  const { base, quote } = market

  return (
    <div className='hfui-chart__wrapper'>
      <TradingViewWidget
        autosize
        hideideas
        toolbar_bg='#fff'
        save_image={false}
        theme={Themes.DARK}
        enable_publishing={false}
        allow_symbol_change={false}
        symbol={`${exchange.toUpperCase()}:${base}${quote}`}
      />
    </div>
  )
}

Chart.propTypes = {
  market: PropTypes.shape({
    base: PropTypes.string,
    quote: PropTypes.string,
  }),
  exchange: PropTypes.string,
}

Chart.defaultProps = {
  market: {
    base: 'BTC',
    quote: 'USD',
  },
  exchange: 'bitfinex',
}

export default React.memo(Chart)
