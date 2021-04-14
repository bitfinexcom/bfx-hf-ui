// import React, { Suspense } from 'react'
import React from 'react'
import _get from 'lodash/get'
import { OrderHistory, ORDER_HISTORY_COLUMNS } from 'ufx-ui'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import { symbolToLabel, getPriceFromStatus, getFormatedStatus } from './OrderHistory.helpers'
import './style.css'

export const ROW_MAPPING = {
  [ORDER_HISTORY_COLUMNS.AMOUNT]: {
    format: (value, _, data) => {
      return _get(data, 'originalAmount')
    },
    // eslint-disable-next-line react/prop-types
    renderer: ({ formattedValue }) => (formattedValue < 0
      ? <span className='hfui-red'>{formattedValue}</span>
      : <span className='hfui-green'>{formattedValue}</span>
    ),
  },
  [ORDER_HISTORY_COLUMNS.PAIR]: {
    format: (value, _, data) => {
      return symbolToLabel(_get(data, 'symbol'))
    },
  },
  [ORDER_HISTORY_COLUMNS.PRICE_AVERAGE]: {
    format: (value, _, data) => {
      return getPriceFromStatus(_get(data, 'status'))
    },
  },
  [ORDER_HISTORY_COLUMNS.STATUS]: {
    format: (value, _, data) => {
      return getFormatedStatus(_get(data, 'status'))
    },
  },
}

export default function index(props) {
  console.log('TCL: index -> props', props)
  const {
    // eslint-disable-next-line react/prop-types
    onRemove, dark,
  } = props

  const orders = useSelector(state => state.ws.orderHistory.orders)
  console.log('TCL: index -> orders', orders)

  return (
  // <Suspense fallback={<div>Loading...</div>}>
    <Panel
      label='ORDER HISTORY'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <OrderHistory
        orders={orders}
        columns={[
          ORDER_HISTORY_COLUMNS.PRICE,
          ORDER_HISTORY_COLUMNS.AMOUNT,
          ORDER_HISTORY_COLUMNS.TYPE,
          ORDER_HISTORY_COLUMNS.STATUS,
          ORDER_HISTORY_COLUMNS.PRICE_AVERAGE,
          ORDER_HISTORY_COLUMNS.PAIR,
        ]}
        isMobile={false}
        rowMapping={ROW_MAPPING}
        className='aads'
        parentWidth={300}
      />
    </Panel>
  // </Suspense>
  )
}
