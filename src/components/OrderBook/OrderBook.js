import React, { memo } from 'react'
import { Book } from 'ufx-ui'

import { propTypes, defaultProps } from './OrderBook.props'
import { getRowMapping, getBookViz } from './OrderBook.helpers'
import './style.css'

// Temporary restriction to suit the design mockups;
// Remove once the design can handle deep OBs
const TEMP_OB_SIDE_LENGTH_LIMIT = 12

// TODO: Unified/split views
const OrderBook = (props) => {
  const { sumAmounts, stackedView, ...rest } = props

  const rowMapping = getRowMapping(sumAmounts, stackedView)
  const bookViz = getBookViz(sumAmounts)

  return (
    <Book
      className='hfui-orderbook'
      rowMapping={rowMapping}
      isStackedView={stackedView}
      bookViz={bookViz}
      numberOfRows={TEMP_OB_SIDE_LENGTH_LIMIT}
      {...rest}
    />
  )
}

OrderBook.propTypes = propTypes
OrderBook.defaultProps = defaultProps

export default memo(OrderBook)
