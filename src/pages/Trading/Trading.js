import React from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'

import Layout from '../../components/Layout'
import OrderForm from '../../components/OrderForm'
import ExchangeInfoBarButton from '../../components/ExchangeInfoBar/ExchangeInfoBar.Button'

import ordersList from '../../orders'
import GridLayoutPage from '../../components/GridLayoutPage'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'

import RefillBalanceModal from '../../components/RefillBalanceModal'

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
    finishGuide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    firstLogin: false,
    showAlgoModal: false,
    apiClientConnected: false,
    hasActiveAlgoOrders: false,
    isGuideActive: true,
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

  render() {
    const {
      firstLogin,
      isGuideActive,
      showAlgoModal,
      apiClientConnected,
      hasActiveAlgoOrders,
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
      <Layout>
        <Layout.Header
          buttons={() => (
            <>
              <ExchangeInfoBarButton icon='save' onClick={() => this.grid.onSaveLayout()} />
              <ExchangeInfoBarButton icon='plus' onClick={() => this.grid.onToggleAddComponentModal()} />
            </>
          )}
        />
        <Layout.Main flex>
          {firstLogin && (
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

          <div className='hfui-tradingpage__column left'>
            <OrderForm
              layoutI='orderform'
              moveable={false}
              removeable={false}
              orders={orders}
            />
          </div>
          <div className='hfui-tradingpage__column center'>
            <GridLayoutPage
              showToolbar={false}
              ref={ref => {
                this.grid = ref
              }}
              defaultLayoutID='Default Trading'
              sharedProps={commonComponentProps}
            />
          </div>

          <ActiveAlgoOrdersModal isOpen={showAlgoModal && hasActiveAlgoOrders && apiClientConnected} />
          <RefillBalanceModal />
        </Layout.Main>
        <Layout.Footer />
      </Layout>
    )
  }
}
