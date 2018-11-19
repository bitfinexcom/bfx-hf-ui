import React from 'react'
import Panel from '../../ui/Panel'
import OrderTable from '../OrderTable'

import './style.css'

export default class SingleAlgoOrderDetails extends React.PureComponent {
  render () {
    const { ao = [], orders } = this.props
    const [,,, state = {}] = ao
    const { args = {} } = state

    console.log(args)

    return [
      <Panel label='Algo Order Details' key='details'>
        <ul className='hf-ui-ao-args-list'>
          {Object.keys(args).map(argKey => (
            <li key={argKey}>
              <div>{argKey}:</div>
              <div>{args[argKey] + ''}</div>
            </li>
          ))}
        </ul>
      </Panel>
    ,
      <OrderTable
        key='orders'
        label='Algo Order Atomic Orders'
        orders={orders.filter(o => o[1] === +ao[0])}
      />
    ]
  }
}
