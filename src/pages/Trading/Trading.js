import React, { memo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'

import Layout from '../../components/Layout'
import OrderForm from '../../components/OrderForm'
import ExchangeInfoBarButton from '../../components/ExchangeInfoBar/ExchangeInfoBar.Button'

import ordersList from '../../orders'
import GridLayoutPage from '../../components/GridLayoutPage'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'
import SwitchMode from '../../components/SwitchMode'

import RefillBalanceModal from '../../components/RefillBalanceModal'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'
const orders = Object.values(ordersList).map(uiDef => uiDef())

const STEPS = [
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
]

const commonComponentProps = {
  dark: true,
  moveable: true,
  removeable: true,
  showMarket: false,
  layoutID: LAYOUT_ID,
  showChartMarket: false,
  canChangeMarket: false,
}

const Trading = ({
  firstLogin,
  isGuideActive,
  showAlgoModal,
  apiClientConnected,
  hasActiveAlgoOrders,
  finishGuide,
  openNotifications,
}) => {
  const grid = useRef()

  const onGuideFinish = useCallback((data) => {
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]
    const CLOSE = 'close'
    if (finishedStatuses.includes(status) || data.action === CLOSE) {
      finishGuide()
    }
  }, [])

  return (
    <Layout>
      <Layout.Header />
      <Layout.Main flex>
        {firstLogin && (
        <Joyride
          callback={onGuideFinish}
          steps={STEPS}
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
          <div className='hfui-tradingpage__menu'>
            <div className='hfui-exchangeinfobar__buttons'>
              <ExchangeInfoBarButton icon='save' onClick={grid.onSaveLayout} />
              <ExchangeInfoBarButton icon='plus' onClick={grid.onToggleAddComponentModal} />
              <ExchangeInfoBarButton icon='notifications' onClick={openNotifications} />
            </div>
            <div className='hfui-tradingpaper__control'>
              <div className='hfui-tradingpaper__control-toggle'>
                <p>Paper Trading</p>
                <SwitchMode />
              </div>
              {/* <div className='hfui-tradingpaper__control-refill'>
              <RefillIcon onClick={onRefillClick} />
            </div> */}
            </div>
          </div>
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
            ref={grid}
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

Trading.propTypes = {
  firstLogin: PropTypes.bool,
  showAlgoModal: PropTypes.bool,
  isGuideActive: PropTypes.bool,
  apiClientConnected: PropTypes.bool,
  hasActiveAlgoOrders: PropTypes.bool,
  finishGuide: PropTypes.func.isRequired,
  openNotifications: PropTypes.func.isRequired,
}

Trading.defaultProps = {
  firstLogin: false,
  showAlgoModal: false,
  apiClientConnected: false,
  hasActiveAlgoOrders: false,
  isGuideActive: true,
}

export default memo(Trading)
