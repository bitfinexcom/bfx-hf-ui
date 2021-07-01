/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { TICKERLIST_KEYS, TICKER_KEYS } from '@ufx-ui/core'

export const tickerDataMapping = {
  [TICKER_KEYS.BASE_CCY]: {
    renderer: ({ baseCcy, quoteCcy, data }) => {
      const { isPerp, perpUI } = data

      return (
        isPerp ? <div className='highlight'>{perpUI}</div> : (
          <>
            <div className='highlight'>{baseCcy}</div>
            /
            <div className='quote-ccy'>{quoteCcy}</div>
          </>
        )
      )
    },
  },
}

export const rowMapping = {
  [TICKERLIST_KEYS.BASE_CCY]: {
    renderer: (
      { rowData },
    ) => {
      const {
        baseCcy, quoteCcy, isPerp, perpUI,
      } = rowData

      return (
        <>
          {isPerp ? <span>{perpUI}</span> : (
            <span className='price-unit'>
              <span>{baseCcy}</span>
              <span>
                /
                {quoteCcy}
              </span>
            </span>
          )}
        </>

      )
    },
  },
}
