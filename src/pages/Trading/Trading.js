import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'

import Layout from '../../components/Layout'
import GridLayoutPage, { LayoutIDs } from '../../components/GridLayoutPage'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'
import RefillBalanceModal from '../../components/RefillBalanceModal'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'

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
    target: '.hfui-orderform__panel',
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
  showMarket: true,
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
}) => {
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

        <div className='hfui-tradingpage__column center'>
          <GridLayoutPage
            defaultLayoutID={LayoutIDs.defaultTrading}
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
}

Trading.defaultProps = {
  firstLogin: false,
  showAlgoModal: false,
  apiClientConnected: false,
  hasActiveAlgoOrders: false,
  isGuideActive: true,
}

export default memo(Trading)
