import React, { Suspense } from 'react'
import { OrderHistory } from 'ufx-ui'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import './style.css'

export default function index(props) {
  console.log('TCL: index -> props', props)
  const {
    // eslint-disable-next-line react/prop-types
    onRemove, dark,
  } = props

  const orders = useSelector(state => state.ws.orderHistory.orders)
  console.log('TCL: index -> orders', orders)

  return (
    <Suspense>
      <Panel
        label='ORDER HISTORY'
        onRemove={onRemove}
        dark={dark}
        darkHeader={dark}
      >
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
      </Panel>
    </Suspense>
  )
}
