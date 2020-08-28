import React from 'react'
import Joyride from 'react-joyride'

import OrderForm from '../../components/OrderForm'
import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'

import BitfinexOrders from '../../orders/bitfinex'
import BinanceOrders from '../../orders/binance'
import { propTypes, defaultProps } from './Trading.props'
import GridLayoutPage from '../../components/GridLayoutPage'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'
const orderDefinitions = {
  bitfinex: Object.values(BitfinexOrders).map(uiDef => uiDef()),
  binance: Object.values(BinanceOrders).map(uiDef => uiDef()),
}

export default class Trading extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    steps: [
      {
        target: '.icon-plus',
        content: 'By clicking on this button you can add a new components to this page.',
      },
      {
        target: '.icon-save',
        content: 'You can save your layout, after you have customized it.',
      },
      {
        target: '.icon-notifications',
        content: 'Here you can find all your notifications.',
      },
      {
        target: '.hfui-statusbar__wrapper',
        content: 'This bar shows all statuses you need to know.',
      },
    ],
  }
  constructor(props) {
    super(props)

    this.grid = React.createRef()
    this.onChangeMarket = this.onChangeMarket.bind(this)
  }

  onChangeMarket({ value }) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(value)
  }

  render() {
    const { activeMarket, firstLogin } = this.props
    const { steps } = this.state
    const commonComponentProps = {
      layoutID: LAYOUT_ID,
      moveable: true,
      removeable: true,
      canChangeExchange: false,
      canChangeMarket: false,
      showExchange: false,
      showMarket: false,
      dark: true,
    }

    return (
      <>
        {firstLogin
         && (
         <Joyride
           steps={steps}
           run
           continuous
         />
         )}
        <ExchangeInfoBar
          selectedMarket={activeMarket}
          onChangeMarket={this.onChangeMarket}
          showAddComponent
          showSave
          onSave={() => this.grid.onSaveLayout()}
          onAddComponent={() => this.grid.onToggleAddComponentModal()}
        />
        <div className='hfui-tradingpage__wrapper'>
          <div className='hfui-tradingpage__inner'>
            <div className='hfui-tradingpage__column left'>
              <OrderForm
                layoutI='orderform'
                orders={orderDefinitions}
                moveable={false}
                removeable={false}
              />
            </div>

            <div className='hfui-tradingpage__column center'>
              <div className='hfui-marketdatapage__wrapper'>
                <GridLayoutPage
                  ref={ref => { this.grid = ref }}
                  defaultLayoutID='Default Trading'
                  sharedProps={commonComponentProps}
                  showToolbar={false}
                />
              </div>
            </div>
          </div>

          <StatusBar />
        </div>
      </>
    )
  }
}
