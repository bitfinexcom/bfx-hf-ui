import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Joyride, { STATUS } from 'react-joyride'
import Layout from '../../components/Layout'
import GridLayoutPage from '../../components/GridLayoutPage'
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
          defaultLayoutID='Default Market Data'
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
  finishGuide: PropTypes.func,
  isGuideActive: PropTypes.bool,
  isFirstLogin: PropTypes.bool.isRequired,
}

MarketData.defaultProps = {
  finishGuide: () => {},
  isGuideActive: false,
}

export default memo(MarketData)
