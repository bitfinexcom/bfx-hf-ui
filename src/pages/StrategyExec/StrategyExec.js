import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import StatusBar from '../../components/StatusBar'
import StrategyExecTable from '../../components/StrategyExecTable'
import Dropdown from '../../ui/Dropdown'
import Panel from '../../ui/Panel'
import Button from '../../ui/Button'

import { propTypes, defaultProps } from './StrategyExec.props'
import './style.css'

export default class StrategyExecPage extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { strategies = [] } = props

    this.state = {
      selectedStrategy: strategies[0],
    }
  }

  onSelectedStrategyChange = (strategyID) => {
    const { strategies } = this.props
    const selectedStrategy = strategies.find(({ id }) => id === strategyID)

    this.setState(() => ({ selectedStrategy }))
  }

  onNavToStrategyEditor = () => {
    const { navigateToStrategyEditorPage } = this.props
    navigateToStrategyEditorPage()
  }

  renderEmpty() {
    return (
      <div className='hfui-strategyexecpage__wrapper empty'>
        <Button
          label='Create a strategy to get started...'
          onClick={this.onNavToStrategyEditor}
          transparent
          underline
          bold
        />
      </div>
    )
  }

  renderPanel() {
    const { execs } = this.props
    const activeExecs = execs.filter(({ active }) => active)
    const historicalExecs = execs.filter(({ active }) => !active)

    return (
      <div className='hfui-strategyexecpage__inner'>
        <Panel
          label='Executions'
          moveable={false}
          removeable={false}
          darkHeader
          dark
        >
          <div
            tabtitle={`Active (${activeExecs.length})`.trim()}
            className={ClassNames('hfui-strategyexecpage__tab', {
              empty: _isEmpty(activeExecs),
            })}
          >
            {_isEmpty(activeExecs) ? (
              <p>No results</p>
            ) : (
              <StrategyExecTable executions={activeExecs} showDuration />
            )}
          </div>

          <div
            tabtitle={`Historical (${activeExecs.length})`.trim()}
            className={ClassNames('hfui-strategyexecpage__tab', {
              empty: _isEmpty(historicalExecs),
            })}
          >
            {_isEmpty(historicalExecs) ? (
              <p>No results</p>
            ) : (
              <StrategyExecTable executions={historicalExecs} />
            )}
          </div>
        </Panel>
      </div>
    )
  }

  // TODO: extract
  renderToolbar() {
    const { strategies = [] } = this.props
    const { selectedStrategy } = this.state
    const strategy = selectedStrategy || strategies[0]

    return (
      <div className='hfui-layoutcontroltoolbar__wrapper'>
        <Dropdown
          highlight
          fallback={strategy.id}
          value={strategy.id}
          onChange={this.onSelectedStrategyChange}
          options={strategies.map(({ id, label }) => ({
            label: `Strategy: ${label}`,
            value: id,
          }))}
        />

        <Button
          label='Open editor to begin new run...'
          onClick={this.onNavToStrategyEditor}
          transparent
          underline
          bold
        />
      </div>
    )
  }

  render() {
    const { strategies } = this.props

    if (_isEmpty(strategies)) {
      return this.renderEmpty()
    }

    return (
      <div className='hfui-strategyexecpage__wrapper'>
        {this.renderToolbar()}
        {this.renderPanel()}

        <StatusBar
          key='statusbar'
          displayLayoutControls={false}
        />
      </div>
    )
  }
}
