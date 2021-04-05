import React, { Suspense } from 'react'
import { OrderHistory } from 'ufx-ui'
import { useSelector } from 'react-redux'
import './style.css'

export default function index() {
  const orders = useSelector(state => state.ws.orderHistory.orders)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistory
        orders={orders}
        rowMapping={{
          selector: 'asd',
          format: (a) => a,
          renderer: (a) => a,
        }}
        className='aads'
        parentWidth={300}
      />
    </Suspense>
  )
}
