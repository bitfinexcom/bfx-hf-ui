import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Joyride, { STEPS, STATUS } from '../../components/Joyride'
import GridLayout from '../../components/GridLayout'
import ActiveAlgoOrdersModal from '../../components/ActiveAlgoOrdersModal'
import RefillBalanceModal from '../../components/RefillBalanceModal'

import './style.css'

const LAYOUT_ID = '__hfui_trading_page'

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
            steps={STEPS.TRADING}
            run={isGuideActive}
          />
        )}

        <div className='hfui-tradingpage__column center'>
          <GridLayout
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
