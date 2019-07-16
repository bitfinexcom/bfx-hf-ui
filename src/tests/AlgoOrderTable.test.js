import React from 'react'
import renderer from 'react-test-renderer'

import AlgoOrderTable from '../components/AlgoOrderTable'

const algoOrders = [
  [42, 'bfx-ping_pong', true, null, +(new Date(Date.now() - (4 * 60 * 60 * 1000)))],
]

const orders = [
  // all we care about is gid & symbol for rendering ([_, gid, _, symbol])
  [null, 0, null, 'tBTCUSD'],
  [null, 0, null, 'tBTCUSD'],
  [null, 0, null, 'tBTCUSD'],
  [null, 0, null, 'tBTCUSD'],
  // note strat (1) is stopped
  [null, 2, null, 'tLEOUSD'],
  [null, 2, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
  [null, 42, null, 'tLEOUSD'],
]

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <AlgoOrderTable
      algoOrders={algoOrders}
      orders={orders}
    />,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
