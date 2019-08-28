import React from 'react'

import GridLayoutPage from '../../components/GridLayoutPage'
import './style.css'

export default class MarketData extends React.PureComponent {
  render () {
    return (
      <div className='dtc-marketdatapage__wrapper'>
        <GridLayoutPage
          defaultLayoutID='Default Market Data'
        />
      </div>
    )
  }
}
