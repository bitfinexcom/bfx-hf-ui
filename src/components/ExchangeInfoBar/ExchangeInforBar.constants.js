/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { TICKERLIST_KEYS, TICKER_KEYS } from '@ufx-ui/core'

export const tickerDataMapping = {
  [TICKER_KEYS.BASE_CCY]: {
    renderer: ({ baseCcy, quoteCcy, data }) => {
      const { isPerp, perpUI } = data

      return (
        isPerp ? <div className='quote-ccy'>{perpUI}</div> : (
          <>
            <div className='highlight'>{baseCcy}</div>
            <div className='quote-ccy'>{quoteCcy}</div>
          </>
        )
      )
    },
  },
}

export const rowMapping = {
  [TICKERLIST_KEYS.BASE_CCY]: {
    renderer: ({
      baseCcy, quoteCcy, data,
    }) => {
      const { isPerp, perpUI } = data

      return (
        <>
          {isPerp ? <span>{perpUI}</span> : (
            <span>
              {baseCcy}
              /
              <span className='price-unit'>{quoteCcy}</span>
            </span>
          )}
        </>

      )
    },
  },
}
