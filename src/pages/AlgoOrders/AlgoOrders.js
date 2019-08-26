import React from 'react'
import AlgoOrderTable from '../../components/AlgoOrderTable'
import AlgoOrderDefinitions from '../../components/AlgoOrderDefenitionsTable'



export default class AlgoOrdersView extends React.Component {
  state = {}

  render() {
    const { algoOrders } = this.props
    return (
      <div className='hfui_view__wrapper'>
        <h1>Algo Orders</h1>
        <div className='hfui_content__wrapper'>
          <AlgoOrderDefinitions
            algoOrders={algoOrders}
          />
          <AlgoOrderTable
            algoOrders={algoOrders}
          />
        </div>
      </div>
    )
  }
}
