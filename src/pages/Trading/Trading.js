import React from 'react'
import Joyride, { STATUS } from 'react-joyride'

import OrderForm from '../../components/OrderForm'
import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import BitfinexOrders from '../../orders/bitfinex'
import { propTypes, defaultProps } from './Trading.props'
import GridLayoutPage from '../../components/GridLayoutPage'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'
const orderDefinitions = {
  bitfinex: Object.values(BitfinexOrders).map(uiDef => uiDef()),
}

export default class Trading extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = {
    steps: [
      {
        target: '.icon-plus',
        content: 'You can easily add new components with this button',
      },
      {
        target: '.icon-save',
        content: 'Customized layouts can be saved here',
      },
      {
        target: '.icon-notifications',
        content: 'You can find your notifications here',
      },
      {
        target: '.hfui-orderformmenu__wrapper',
        content: 'If you want to create an order, this menu contains all orders available',
      },
      {
        locale: { last: 'Finish' },
        target: '.hfui-statusbar__left',
        content: 'Here you can find the current version of your app. In case there is an update, there will be an update button',
      },
    ],
  }
  constructor(props) {
    super(props)

    this.grid = React.createRef()
    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onGuideFinish = this.onGuideFinish.bind(this)
  }

  onChangeMarket({ value }) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(value)
  }

  onGuideFinish(data) {
    const { finishGuide } = this.props
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]
    const CLOSE = 'close'
    if (finishedStatuses.includes(status) || data.action === CLOSE) {
      finishGuide()
    }
  }

  onTradingModeModalClose() {
    const { changeTradingModeModalState } = this.props
    changeTradingModeModalState(false)
  }

  onTradingModeModalSubmit() {
    const { changeTradingMode, isPaperTrading } = this.props
    changeTradingMode(!isPaperTrading)
    window.location.reload()
  }

  onRefillBalanceModalClose() {
    const { changeRefillBalanceModalState } = this.props
    changeRefillBalanceModalState(false)
  }

  onRefillBalanceModalSubmit() { //eslint-disable-line
    // todo
  }

  render() {
    const {
      activeMarket,
      firstLogin,
      isGuideActive,
      isTradingModeModalVisible,
      isRefillBalanceModalVisible,
    } = this.props
    const { steps } = this.state
    const commonComponentProps = {
      dark: true,
      moveable: true,
      removeable: true,
      showMarket: false,
      showExchange: false,
      layoutID: LAYOUT_ID,
      showChartMarket: false,
      canChangeMarket: false,
      canChangeExchange: false,
    }

    return (
      <>
        {firstLogin
         && (
         <Joyride
           callback={this.onGuideFinish}
           steps={steps}
           run={isGuideActive}
           continuous
           showProgress
           showSkipButton
           styles={{
             options: {
               zIndex: 10000,
             },
           }}
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
                { isTradingModeModalVisible && (
                  <Modal
                    onClose={() => this.onTradingModeModalClose()}
                    actions={(
                      <Button
                        green
                        onClick={() => this.onTradingModeModalSubmit()}
                        label={[
                          <p key='text'>Okay</p>,
                        ]}
                      />
                    )}
                  >
                    <p>The app will reboot after you press Okay. It&apos;s required for switching trading mode.</p>
                  </Modal>
                )}
                { isRefillBalanceModalVisible && (
                  <Modal
                    label='REFILLING PAPER BALANCES'
                    onClose={() => this.onRefillBalanceModalClose()}
                    className='hfui-refillbalance__modal'
                    actions={(
                      <Button
                        green
                        onClick={() => this.onRefillBalanceModalSubmit()}
                        label={[
                          <p key='text'>Submit</p>,
                        ]}
                      />
                    )}
                  >
                    <div className='modal-content'>
                      <Input placeholder='AAA' />
                      <Input placeholder='BBB' />
                      <Input placeholder='TESTBTC' />
                      <Input placeholder='TESTUSDT' />
                      <Input placeholder='TESTUSD' />
                    </div>
                  </Modal>
                )}
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
