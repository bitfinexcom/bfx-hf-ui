import React from 'react'
import randomColor from 'randomcolor'
import Joyride, { STATUS } from 'react-joyride'

import StrategyEditor from '../../components/StrategyEditor'
import Panel from '../../ui/Panel'
import Markdown from '../../ui/Markdown'
import StatusBar from '../../components/StatusBar'
import Backtester from '../../components/Backtester'
import LiveStrategyExecutor from '../../components/LiveStrategyExecutor'
import { propTypes, defaultProps } from './StrategyEditor.props'

import './style.css'

const DocsPath = require('bfx-hf-strategy/docs/api.md')

export default class StrategyEditorPage extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    indicators: [],
    strategyContent: null,
    steps: [
      {
        target: '.hfui-create-strategy__btn',
        content: 'Create your own strategies',
      },
      {
        target: '.hfui-open-strategy__btn',
        content: 'Or open an existing one',
      },
      {
        target: '.hfui-markdown__wrapper',
        content: 'In this section you find the available function declarations to code your own strategies',
      },
    ],
  }

  constructor(props) {
    super(props)

    this.onIndicatorsChange = this.onIndicatorsChange.bind(this)
    this.onGuideFinish = this.onGuideFinish.bind(this)
  }

  componentDidMount() {
    // load readme docs (DocsPath is an object when running in electron window)
    const docsPath = typeof DocsPath === 'object' ? DocsPath.default : DocsPath
    fetch(docsPath)
      .then(response => response.text())
      .then(t => this.setState(() => ({ docsText: t })))
  }

  onIndicatorsChange(indicators) {
    // TODO: Better color generation; to save time we generate enough colors for
    //       all indicators here, but optimally we'd switch on i.constructor.ui
    this.setState(() => ({
      indicators: Object.values(indicators).map((ind) => {
        let colors = []

        for (let i = 0; i < 5; i += 1) {
          colors.push(randomColor())
        }

        // allow users to overwrite colors
        if (ind.color) {
          colors[0] = ind.color
        } else if (ind.colors) {
          colors = ind.colors // eslint-disable-line
        }

        return [ind.constructor, ind._args, colors]
      }),
    }))
  }

  onGuideFinish(data) {
    const { finishGuide } = this.props
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      finishGuide()
    }
  }

  render() {
    const {
      indicators,
      strategyContent,
      docsText = '',
      steps,
    } = this.state
    const { firstLogin, isGuideActive } = this.props
    return (
      <div className='hfui-strategyeditorpage__wrapper'>
        <StrategyEditor
          dark
          onStrategyChange={content => this.setState(() => ({ strategyContent: content }))}
          key='editor'
          onIndicatorsChange={this.onIndicatorsChange}
          moveable={false}
          removeable={false}
          tf='1m'
        />
        {firstLogin
         && (
         <Joyride
           steps={steps}
           callback={this.onGuideFinish}
           run={isGuideActive}
           continuous
           scrollToFirstStep
           showProgress
           showSkipButton
           styles={{
             options: {
               zIndex: 10000,
             },
           }}
         />
         )}
        <div
          key='main'
          className='hfui-strategiespage__right'
        >
          <Panel
            className='hfui-strategiespage__pannel-wrapper'
            moveable={false}
            removeable={false}
            darkHeader
          >
            <Markdown
              tabTitle='Docs'
              text={docsText}
            />
            <div
              tabTitle='Backtest'
              style={{ height: 1200 }}
            >
              <Backtester
                {...this.props}
                strategyContent={strategyContent}
                indicators={indicators}
              />
            </div>
            <div
              tabTitle='Execute'
            >
              <LiveStrategyExecutor
                strategyContent={strategyContent}
              />
            </div>
          </Panel>
        </div>

        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
