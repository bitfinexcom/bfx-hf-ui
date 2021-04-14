import React from 'react'
import _get from 'lodash/get'
import { OrderHistory as UfxOrderHistory, ORDER_HISTORY_COLUMNS } from 'ufx-ui'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import { symbolToLabel, getPriceFromStatus, getFormatedStatus } from './OrderHistory.helpers'
import './style.css'

const {
  PRICE,
  AMOUNT,
  TYPE,
  STATUS,
  PRICE_AVERAGE,
  PAIR,
} = ORDER_HISTORY_COLUMNS

export const ROW_MAPPING = {
  [AMOUNT]: {
    format: (value, _, data) => {
      return _get(data, 'originalAmount')
    },
    // eslint-disable-next-line react/prop-types
    renderer: ({ formattedValue }) => (formattedValue < 0
      ? <span className='hfui-red'>{formattedValue}</span>
      : <span className='hfui-green'>{formattedValue}</span>
    ),
  },
  [PAIR]: {
    format: (value, _, data) => {
      return symbolToLabel(_get(data, 'symbol'))
    },
  },
  [PRICE_AVERAGE]: {
    format: (value, _, data) => {
      return getPriceFromStatus(_get(data, 'status'))
    },
  },
  [STATUS]: {
    format: (value, _, data) => {
      return getFormatedStatus(_get(data, 'status'))
    },
  },
}

export default function OrderHistory(props) {
  const {
    // eslint-disable-next-line react/prop-types
    onRemove, dark,
  } = props

  const orders = useSelector(state => state.ws.orderHistory.orders)
  const columns = [
    PRICE,
    AMOUNT,
    TYPE,
    STATUS,
    PRICE_AVERAGE,
    PAIR,
  ]

  return (
    <Panel
      label='ORDER HISTORY'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <UfxOrderHistory
        orders={orders}
        columns={columns}
        rowMapping={ROW_MAPPING}
        isMobile={false}
      />
    </Panel>
  )
}
