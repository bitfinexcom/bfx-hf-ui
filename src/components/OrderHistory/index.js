import React, { Suspense } from 'react'
import { OrderHistory } from 'ufx-ui'

export default function index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistory
        orders={{}}
        loading
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
