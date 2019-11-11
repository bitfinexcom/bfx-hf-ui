import React from 'react'

import GridLayoutPage from '../../components/GridLayoutPage'
import './style.css'

export default class MarketData extends React.PureComponent {
  render() {
    const commonComponentProps = {
      canChangeMarket: true,
      canChangeExchange: true,
      showMarket: true,
      showExchange: true,
      dark: true,
      darkHeader: true,
    }

    return (
      <div className='hfui-marketdatapage__wrapper'>
        <GridLayoutPage
          defaultLayoutID='Default Market Data'
          tradesProps={commonComponentProps}
          bookProps={commonComponentProps}
          chartProps={commonComponentProps}
        />
      </div>
    )
  }
}
