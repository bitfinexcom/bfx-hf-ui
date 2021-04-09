// import React, { Suspense } from 'react'
import React from 'react'
import { OrderHistory, ORDER_HISTORY_KEYS } from 'ufx-ui'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import './style.css'

export const ROW_MAPPING = {
  // [ORDER_HISTORY_KEYS.AMOUNT]: {
  //   format: (value, _, data) => (
  //     <OrderAmount amount={value} originalAmount={_get(data, 'originalAmount')} />
  //   ),
  // },
  // [ORDER_HISTORY_KEYS.STATUS]: {
  //   renderer: ({ value }) => <OrderStatus status={value} />,
  // },
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
          ORDER_HISTORY_KEYS.PRICE,
          ORDER_HISTORY_KEYS.AMOUNT,
          ORDER_HISTORY_KEYS.TYPE,
          ORDER_HISTORY_KEYS.STATUS,
          ORDER_HISTORY_KEYS.PRICE_AVERAGE,
          ORDER_HISTORY_KEYS.PAIR,
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
