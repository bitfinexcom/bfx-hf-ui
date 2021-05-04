import React from 'react'
import _get from 'lodash/get'
import { OrderHistory as UfxOrderHistory, ORDER_HISTORY_COLUMNS } from '@ufx-ui/core'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import { symbolToLabel, getPriceFromStatus, getFormatedStatus } from './OrderHistory.helpers'
import './style.css'

const {
  ICON,
  ID,
  PAIR,
  TYPE,
  BASE_CCY,
  QUOTE_CCY,
  AMOUNT,
  ORIGINAL_AMOUNT,
  PRICE,
  PRICE_AVERAGE,
  PLACED,
  STATUS,
} = ORDER_HISTORY_COLUMNS

export const ROW_MAPPING = {
  [ID]: {
    hidden: true,
  },
  [BASE_CCY]: {
    hidden: true,
  },
  [QUOTE_CCY]: {
    hidden: true,
  },
  [ORIGINAL_AMOUNT]: {
    hidden: true,
  },
  [PLACED]: {
    hidden: true,
  },
  [ICON]: {
    index: 0,
    truncate: true,
  },
  [PRICE]: {
    index: 1,
    truncate: true,
  },
  [AMOUNT]: {
    index: 2,
    truncate: true,
    format: (value, _, data) => {
      return _get(data, 'originalAmount')
    },
    // eslint-disable-next-line react/prop-types
    renderer: ({ formattedValue }) => (formattedValue < 0
      ? <span className='hfui-red'>{formattedValue}</span>
      : <span className='hfui-green'>{formattedValue}</span>
    ),
  },
  [TYPE]: {
    index: 3,
    truncate: true,
  },
  [STATUS]: {
    index: 4,
    truncate: true,
    format: (value, _, data) => {
      return getFormatedStatus(_get(data, 'status'))
    },
  },
  [PRICE_AVERAGE]: {
    index: 5,
    truncate: true,
    format: (value, _, data) => {
      return getPriceFromStatus(_get(data, 'status'))
    },
  },
  [PAIR]: {
    index: 6,
    truncate: true,
    format: (value, _, data) => {
      return symbolToLabel(_get(data, 'symbol'))
    },
  },

}

export default function OrderHistory(props) {
  const {
    // eslint-disable-next-line react/prop-types
    onRemove, dark,
  } = props

  const orders = useSelector(state => state.ws.orderHistory.orders)

  return (
    <Panel
      label='ORDER HISTORY'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <UfxOrderHistory
        orders={orders}
        rowMapping={ROW_MAPPING}
        isMobileLayout={false}
      />
    </Panel>
  )
}
