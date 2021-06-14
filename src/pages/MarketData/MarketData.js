import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'
import Layout from '../../components/Layout'
import GridLayoutPage, { LayoutIDs } from '../../components/GridLayoutPage'
import './style.css'

const STEPS = [
  {
    locale: { last: 'Finish' },
    target: '.hfui-button.green',
    content: 'To customize your layout, you can add components to it',
  },
]

const commonComponentProps = {
  dark: true,
  darkHeader: true,
  showMarket: true,
  canChangeMarket: true,
  showChartMarket: true,
}

const MarketData = ({ isGuideActive, isFirstLogin, finishGuide }) => {
  const onGuideFinish = (data) => {
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]
    const CLOSE = 'close'
    if (finishedStatuses.includes(status) || data.action === CLOSE) {
      finishGuide()
    }
  }

  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>
        {isFirstLogin && (
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
        <GridLayoutPage
          defaultLayoutID={LayoutIDs.defaultMarketData}
          tradesProps={commonComponentProps}
          bookProps={commonComponentProps}
          chartProps={commonComponentProps}
        />
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

MarketData.propTypes = {
  finishGuide: PropTypes.func.isRequired,
  isGuideActive: PropTypes.bool.isRequired,
  isFirstLogin: PropTypes.bool.isRequired,
}

export default memo(MarketData)
