import React from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'

import OrderForm from '../../components/OrderForm'
import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import BitfinexOrders from '../../orders/bitfinex'
import GridLayoutPage from '../../components/GridLayoutPage'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'
const orderDefinitions = {
  bitfinex: Object.values(BitfinexOrders).map(uiDef => uiDef()),
}

export default class Trading extends React.PureComponent {
  static propTypes = {
    firstLogin: PropTypes.bool,
    showAlgoModal: PropTypes.bool,
    isGuideActive: PropTypes.bool,
    apiClientConnected: PropTypes.bool,
    hasActiveAlgoOrders: PropTypes.bool,
    finishGuide: PropTypes.func.isRequired,
    getActiveAOs: PropTypes.func.isRequired,
    showActiveAOsModal: PropTypes.func.isRequired,
  }

  static defaultProps ={
    firstLogin: false,
    showAlgoModal: false,
    isGuideActive: false,
    apiClientConnected: false,
    hasActiveAlgoOrders: false,
  }

  grid = React.createRef()

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

  componentDidMount() {
    const { getActiveAOs } = this.props
    getActiveAOs()
  }

  componentDidUpdate() {
    const { getActiveAOs } = this.props
    getActiveAOs()
  }

  onCloseAlgoModal = () => {
    const { showActiveAOsModal } = this.props
    showActiveAOsModal(false)
  }

  onGuideFinish = (data) => {
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
      firstLogin,
      isGuideActive,
      showAlgoModal,
      apiClientConnected,
      hasActiveAlgoOrders,
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
        {showAlgoModal && hasActiveAlgoOrders && apiClientConnected
          && <ActiveAlgoOrdersModal onClose={() => this.onCloseAlgoModal()} />}
        <ExchangeInfoBar
          showSave
          showAddComponent
          onSave={() => this.grid.onSaveLayout()}
          onAddComponent={() => this.grid.onToggleAddComponentModal()}
        />
        <div className='hfui-tradingpage__wrapper'>
          <div className='hfui-tradingpage__inner'>
            <div className='hfui-tradingpage__column left'>
              <OrderForm
                layoutI='orderform'
                moveable={false}
                removeable={false}
                orders={orderDefinitions}
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
                  showToolbar={false}
                  ref={ref => { this.grid = ref }}
                  defaultLayoutID='Default Trading'
                  sharedProps={commonComponentProps}
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
