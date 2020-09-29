import React from 'react'
import Joyride, { STATUS } from 'react-joyride'
import GridLayoutPage from '../../components/GridLayoutPage'
import { propTypes } from './MarketData.props'
import './style.css'

export default class MarketData extends React.PureComponent {
  static propTypes = propTypes

  state = {
    steps: [
      {
        target: '.hfui-button',
        content: 'Create new layout',
      },
      {
        target: '.hfui-button.green',
        content: 'Add custom component',
      },
      {
        target: '.hfui-dropdown__button.highlight',
        content: 'Select your layout.',
      },
      {
        target: '.hfui-save-layout__btn',
        content: 'With this button you can save your custom layout',
      },
      {
        locale: { last: 'Finish' },
        target: '.hfui-remove-layout__btn',
        content: 'Or delete it',
      },
    ],
  }
  constructor(props) {
    super(props)
    this.onGuideFinish = this.onGuideFinish.bind(this)
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
  render() {
    const commonComponentProps = {
      canChangeMarket: true,
      canChangeExchange: true,
      showMarket: true,
      showExchange: true,
      dark: true,
      darkHeader: true,
      renderInPanel: true,
    }
    const { steps } = this.state
    const { isGuideActive, firstLogin } = this.props
    return (
      <div className='hfui-marketdatapage__wrapper'>
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
        <GridLayoutPage
          defaultLayoutID='Default Market Data'
          tradesProps={commonComponentProps}
          bookProps={commonComponentProps}
          chartProps={commonComponentProps}
        />
      </div>
    )
  }
}
