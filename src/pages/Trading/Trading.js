import React from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'

import OrderForm from '../../components/OrderForm'
import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import ordersList from '../../orders'
import GridLayoutPage from '../../components/GridLayoutPage'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'
import TradingModeModal from '../../components/TradingModeModal'
import BadConnectionModal from '../../components/BadConnectionModal'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'
const orders = Object.values(ordersList).map(uiDef => uiDef())

export default class Trading extends React.PureComponent {
  static propTypes = {
    firstLogin: PropTypes.bool,
    showAlgoModal: PropTypes.bool,
    isGuideActive: PropTypes.bool,
    apiClientConnected: PropTypes.bool,
    hasActiveAlgoOrders: PropTypes.bool,
    isRefillBalanceModalVisible: PropTypes.bool.isRequired,
    finishGuide: PropTypes.func.isRequired,
    changeRefillBalanceModalState: PropTypes.func,
  }

  static defaultProps ={
    firstLogin: false,
    showAlgoModal: false,
    apiClientConnected: false,
    hasActiveAlgoOrders: false,
    isGuideActive: true,
    changeRefillBalanceModalState: () => {},
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

  onGuideFinish = (data) => {
    const { finishGuide } = this.props
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]
    const CLOSE = 'close'
    if (finishedStatuses.includes(status) || data.action === CLOSE) {
      finishGuide()
    }
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
      isRefillBalanceModalVisible,
    } = this.props
    const { steps } = this.state
    const commonComponentProps = {
      dark: true,
      moveable: true,
      removeable: true,
      showMarket: false,
      layoutID: LAYOUT_ID,
      showChartMarket: false,
      canChangeMarket: false,
    }

    return (
      <div>
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
          && <ActiveAlgoOrdersModal />}
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
                orders={orders}
              />
            </div>

            <div className='hfui-tradingpage__column center'>
              <div className='hfui-marketdatapage__wrapper'>
                <TradingModeModal />
                <BadConnectionModal />
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
      </div>
    )
  }
}
