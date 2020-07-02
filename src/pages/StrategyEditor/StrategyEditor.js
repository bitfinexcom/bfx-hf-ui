import React from 'react'
import randomColor from 'randomcolor'
import _isObject from 'lodash/isObject'

import StrategyEditor from '../../components/StrategyEditor'
import Panel from '../../ui/Panel'
import Markdown from '../../ui/Markdown'
import StatusBar from '../../components/StatusBar'
import Backtester from '../../components/Backtester'
import LiveStrategyExecutor from '../../components/LiveStrategyExecutor'
import { propTypes, defaultProps } from './StrategyEditor.props'

import './style.css'

const DocsPath = require('bfx-hf-strategy/docs/runtime.md')

export default class StrategyEditorPage extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    indicators: [],
    strategyContent: null,
    strategy: null,
  }

  constructor(props) {
    super(props)

    this.onIndicatorsChange = this.onIndicatorsChange.bind(this)
  }

  componentDidMount() {
    // load readme docs (DocsPath is an object when running in electron window)
    const docsPath = _isObject(DocsPath) ? DocsPath.default : DocsPath

    fetch(docsPath) // eslint-disable-line
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

  onStrategyContentChange = (strategyContent, strategy) => {
    this.setState(() => ({ strategy, strategyContent }))
  }

  render() {
    const {
      indicators,
      strategyContent,
      strategy,
      docsText = '',
    } = this.state

    return (
      <div className='hfui-strategyeditorpage__wrapper'>
        <StrategyEditor
          dark
          tf='1m'
          key='editor'
          moveable={false}
          removeable={false}
          onIndicatorsChange={this.onIndicatorsChange}
          onStrategyChange={this.onStrategyContentChange}
        />

        <div
          key='main'
          className='hfui-strategiespage__right'
        >
          <Panel
            label=''
            className='hfui-strategiespage__pannel-wrapper'
            moveable={false}
            removeable={false}
            darkHeader
          >
            <Markdown
              tabtitle='Docs'
              text={docsText}
            />

            <Backtester
              tabtitle='Backtest'
              strategy={strategy}
              strategyContent={strategyContent}
              indicators={indicators}
            />

            <div tabtitle='Execute'>
              <LiveStrategyExecutor
                strategy={strategy}
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
