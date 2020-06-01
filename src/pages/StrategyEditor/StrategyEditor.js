import React from 'react'
import randomColor from 'randomcolor'

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
  }

  constructor(props) {
    super(props)

    this.onIndicatorsChange = this.onIndicatorsChange.bind(this)
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

  render() {
    const {
      indicators, strategyContent,
    } = this.state

    return (
      <div className='hfui-strategyeditorpage__wrapper'>
        <StrategyEditor
          dark
          onStrategyChange={content => this.setState({ strategyContent: content })}
          key='editor'
          onIndicatorsChange={this.onIndicatorsChange}
          moveable={false}
          removeable={false}
          tf='1m'
        />

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
              tabtitle='Docs'
              src={typeof DocsPath === 'object' ? DocsPath.default : DocsPath}
            />
            <div
              tabtitle='Backtest'
              style={{ height: 1200 }}
            >
              <Backtester
                {...this.props}
                strategyContent={strategyContent}
                indicators={indicators}
              />
            </div>
            <div
              tabtitle='Execute'
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
