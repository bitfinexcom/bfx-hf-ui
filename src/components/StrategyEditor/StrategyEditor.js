import React from 'react'
import Debug from 'debug'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import Indicators from 'bfx-hf-indicators'
import { nonce } from 'bfx-api-node-util'
import HFS from 'bfx-hf-strategy'
import HFU from 'bfx-hf-util'
import raw from 'raw.macro'
import _ from 'lodash'
import * as SRD from '@projectstorm/react-diagrams'

import Templates from './templates'
import Results from './Results'

import StrategyExecWorker from '../../workers/strategy_exec.worker'

import { generateResults } from './StrategyEditor.helpers'
import StrategyEditorHelp from './StrategyEditorHelp'
import StrategyEditorPanel from './StrategyEditorPanel'
import CreateNewStrategyModal from '../CreateNewStrategyModal'
import OpenExistingStrategyModal from '../OpenExistingStrategyModal'
import { propTypes, defaultProps } from './StrategyEditor.props'
import './style.css'

const generalHelp = raw('./help/general.md')

const debug = Debug('hfui-ui:c:strategy-editor')
const STRATEGY_SECTIONS = [
  'defineIndicators',
  'onPriceUpdate',
  'onEnter',
  'onUpdate',
  'onUpdateLong',
  'onUpdateShort',
  'onUpdateClosing',
  'onPositionOpen',
  'onPositionUpdate',
  'onPositionClose',
  'onStart',
  'onStop',
]

export default class StrategyEditor extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    activeContent: 'defineIndicators',
    results: null,
    execError: null,
    execRunning: false,
    strategy: null,
    strategyDirty: false,
    sectionErrors: {},

    // Strategy exec ticks, for progress
    currentTick: 0,
    totalTicks: 0,

    editorMaximised: false,
    createNewStrategyModalOpen: false,
    openExistingStrategyModalOpen: false,
    editorMode: 'visual',
    helpOpen: false,
  }

  constructor(props) {
    super(props)

    this.onStrategyExecWorkerMessage = this.onStrategyExecWorkerMessage.bind(this)
    this.onEditorContentChange = this.onEditorContentChange.bind(this)
    this.onBacktestStrategy = this.onBacktestStrategy.bind(this)
    this.onClearError = this.onClearError.bind(this)
    this.onOpenSelectModal = this.onOpenSelectModal.bind(this)
    this.onOpenCreateModal = this.onOpenCreateModal.bind(this)
    this.onCloseModals = this.onCloseModals.bind(this)
    this.onCreateNewStrategy = this.onCreateNewStrategy.bind(this)
    this.onSaveStrategy = this.onSaveStrategy.bind(this)
    this.onLoadStrategy = this.onLoadStrategy.bind(this)
    this.onToggleHelp = this.onToggleHelp.bind(this)
    this.onToggleMaximiseEditor = this.onToggleMaximiseEditor.bind(this)

    this.execWorker = new StrategyExecWorker()
    this.execWorker.onmessage = this.onStrategyExecWorkerMessage
  }

  componentWillUnmount() {
    this.execWorker.terminate()
  }

  onCreateNewStrategy(label, templateLabel) {
    const strategy = { label }
    const template = Templates.find(t => t.label === templateLabel)

    if (!template) {
      debug('unknown template: %s', templateLabel)
    }

    const templateSections = Object.keys(template)

    templateSections.forEach((s) => {
      if (s === 'label') return

      strategy[s] = template[s]
    })

    this.setState(() => ({
      sectionErrors: {},
      strategyDirty: true,
      strategy,
    }))

    if (strategy.defineIndicators) {
      setTimeout(() => {
        this.onDefineIndicatorsChange()
      }, 0)
    }
  }

  onLoadStrategy(strategy) {
    this.setState(() => ({
      sectionErrors: {},
      strategyDirty: false,
      strategy,
    }))

    if (strategy.defineIndicators) {
      setTimeout(() => {
        this.onDefineIndicatorsChange()
      }, 0)
    }
  }

  onToggleHelp() {
    this.setState(({ helpOpen }) => ({
      helpOpen: !helpOpen,
    }))
  }

  onOpenCreateModal() {
    this.setState(() => ({
      createNewStrategyModalOpen: true,
      openExistingStrategyModalOpen: false,
    }))
  }

  onOpenSelectModal() {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: true,
    }))
  }

  onCloseModals() {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
    }))
  }

  onClearError() {
    this.setState(() => ({
      sectionErrors: {},
      execError: '',
    }))
  }

  onSaveStrategy() {
    const { authToken, onSave } = this.props
    const { strategy } = this.state

    onSave(authToken, strategy)

    this.setState(() => ({ strategyDirty: false }))
    this.onCloseModals()
  }

  onStrategyExecWorkerMessage(incomingMessage = {}) {
    const { data: messageData } = incomingMessage
    const { type, data = {} } = messageData

    if (type === 'EXEC_STRATEGY_PARSE_ERROR') {
      const { message, section } = data

      this.setSectionError(section, message)
    } else if (type === 'EXEC_STRATEGY_START') {
      this.setState(() => ({
        execRunning: true,
        results: null,
      }))
    } else if (type === 'EXEC_STRATEGY_ERROR') {
      const { message } = data
      this.updateError(message)
      this.setState(() => ({ execRunning: false }))
    } else if (type === 'EXEC_STRATEGY_TICK') {
      const { currentTick, totalTicks } = data
      const { totalTicks: currentTotalTicks } = this.state

      if (totalTicks !== currentTotalTicks || currentTick % 100 === 0) {
        this.setState(() => ({
          currentTick,
          totalTicks,
        }))
      }
    } else if (type === 'EXEC_STRATEGY_END') {
      this.setState(() => ({ execRunning: false }))
      this.updateResults(data)
    }
  }

  onEditorContentChange(editor, data, code) {
    const { activeContent } = this.state

    this.setState(({ strategy }) => ({
      strategyDirty: true,
      strategy: {
        ...strategy,
        [activeContent]: code,
      },
    }))

    setTimeout(() => {
      if (activeContent === 'defineIndicators') {
        this.onDefineIndicatorsChange() // tracks errors
      } else {
        this.evalSectionContent(activeContent)
      }
    }, 0)
  }

  onActiveContentChange(activeContent) {
    this.setState(() => ({ activeContent }))
  }

  onDefineIndicatorsChange() {
    const { onIndicatorsChange } = this.props

    if (!onIndicatorsChange) {
      return
    }

    const indicatorFunc = this.evalSectionContent('defineIndicators')
    let indicators = {}

    if (indicatorFunc) {
      try {
        indicators = indicatorFunc(Indicators)
      } catch (e) {
        this.setSectionError('defineIndicators', e.message)
      }
    }

    Object.values(indicators).forEach((i) => {
      i.key = `${nonce()}` // eslint-disable-line
    })

    onIndicatorsChange(indicators)
  }

  onBacktestStrategy() {
    const { strategy } = this.state
    const {
      tf, activeExchange, activeMarket,
      candles: candleData,
    } = this.props

    const strategyContent = {}
    let section

    for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
      section = STRATEGY_SECTIONS[i]
      const content = strategy[section]

      if (!_isEmpty(content)) {
        strategyContent[section] = content
      }
    }

    this.execWorker.postMessage({
      type: 'EXEC_STRATEGY',
      data: {
        exID: activeExchange,
        mID: activeMarket.uiID,
        strategyContent,
        candleData,
        tf,
      },
    })
  }

  onToggleMaximiseEditor() {
    this.setState(({ editorMaximised }) => ({
      editorMaximised: !editorMaximised,
    }))
  }

  onSwitchEditorMode(editorMode) {
    this.setState(() => ({ editorMode }))
  }

  setSectionError(section, msg) {
    this.setState(({ sectionErrors }) => ({
      sectionErrors: {
        ...sectionErrors,
        [section]: msg,
      },
    }))
  }

  clearSectionError(section) {
    this.setSectionError(section, '')
  }

  evalSectionContent(section, providedContent) {
    const { strategy } = this.state
    const content = providedContent || strategy[section] || ''

    // We don't immediately exec the 2 possible 'define' methods
    if (section.substring(0, 6) === 'define') {
      try {
        const func = eval(content) // eslint-disable-line
        this.clearSectionError(section)
        return func
      } catch (e) {
        this.setSectionError(section, e.message)
        return null
      }
    } else if (section.substring(0, 2) === 'on') {
      try {
        const func = eval(content)({ HFS, HFU, _ }) // eslint-disable-line
        this.clearSectionError(section)
        return func
      } catch (e) {
        this.setSectionError(section, e.message)
        return null
      }
    } else {
      console.error(`unrecognised setion handler prefix: ${section}`)
      return null
    }
  }

  updateResults(btState = {}) {
    const { onResultsChange } = this.props
    const results = generateResults(btState)

    this.setState(() => ({
      results,
      execError: null,
    }))

    if (onResultsChange) {
      onResultsChange(results, null)
    }
  }

  updateError(errMessage) {
    this.setState(() => ({
      results: null,
      execError: errMessage,
    }))
  }

  renderPanel(content) {
    const {
      strategy, execRunning, strategyDirty, helpOpen, editorMaximised,
      editorMode, dark,
    } = this.state

    const { onRemove, moveable, removeable } = this.props

    return (
      <StrategyEditorPanel
        dark={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        execRunning={execRunning}
        helpOpen={helpOpen}
        strategyDirty={strategyDirty}
        strategy={strategy}
        editorMode={editorMode}
        editorMaximised={editorMaximised}
        onToggleHelp={this.onToggleHelp}
        onOpenSelectModal={this.onOpenSelectModal}
        onOpenCreateModal={this.onOpenCreateModal}
        onSaveStrategy={this.onSaveStrategy}
        onBacktestStrategy={this.onBacktestStrategy}
        onSwitchEditorMode={this.onSwitchEditorMode}
        onToggleMaximiseEditor={this.onToggleMaximiseEditor}
      >
        {content}
      </StrategyEditorPanel>
    )
  }

  renderEmptyContent() {
    const {
      createNewStrategyModalOpen, openExistingStrategyModalOpen,
    } = this.state  
    const { ReactGA, ga} = this.props

    return (
      <div className='hfui-strategyeditor__empty-content'>
        <div>
          <p
            className='button'
            onClick={this.onOpenCreateModal}
          >
            Create
          </p>
          <p>a new strategy or</p>
          <p
            className='button'
            onClick={this.onOpenSelectModal}
          >
            open
          </p>
          <p>an existing one.</p>
        </div>

        {createNewStrategyModalOpen && (
          <CreateNewStrategyModal
            ReactGA={ReactGA}
            ga={ga}
            onClose={this.onCloseModals}
            onSubmit={this.onCreateNewStrategy}
          />
        )}

        {openExistingStrategyModalOpen && (
          <OpenExistingStrategyModal
            onClose={this.onCloseModals}
            onOpen={this.onLoadStrategy}
          />
        )}
      </div>
    )
  }

  render() {
    const { renderResults } = this.props
    const {
      activeContent, results, execError, execRunning, currentTick, totalTicks,
      strategy, createNewStrategyModalOpen, openExistingStrategyModalOpen,
      sectionErrors, helpOpen, editorMaximised, // editorMode,
    } = this.state

    if (!strategy) {
      return this.renderPanel(this.renderEmptyContent())
    }

    // 1) setup the diagram engine
    const engine = new SRD.DiagramEngine()
    engine.installDefaultFactories()

    // 2) setup the diagram model
    const model = new SRD.DiagramModel()

    // 3) create a default node
    const node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)')
    const port1 = node1.addOutPort('Out')
    node1.setPosition(100, 100)

    // 4) create another default node
    const node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)')
    const port2 = node2.addInPort('In')
    node2.setPosition(400, 100)

    // 5) link the ports
    const link1 = port1.link(port2)

    // 6) add the models to the root graph
    model.addAll(node1, node2, link1)

    // 7) load model into engine
    engine.setDiagramModel(model)

    return this.renderPanel(
      <div className='hfui-strategyeditor__wrapper'>
        {helpOpen && <StrategyEditorHelp source={generalHelp} />}

        {createNewStrategyModalOpen && (
          <CreateNewStrategyModal
            onClose={this.onCloseModals}
            onSubmit={this.onCreateNewStrategy}
          />
        )}

        {openExistingStrategyModalOpen && (
          <OpenExistingStrategyModal
            onClose={this.onCloseModals}
            onOpen={this.onLoadStrategy}
          />
        )}

        <ul className='hfui-strategyeditor__func-select'>
          {STRATEGY_SECTIONS.map(section => (
            <li
              key={section}
              onClick={this.onActiveContentChange.bind(this, section)}
              className={ClassNames({
                active: activeContent === section,
                hasError: !!sectionErrors[section],
                empty: _isEmpty(strategy[section]),
              })}
            >
              <p>{section}</p>

              {_isEmpty(strategy[activeContent])
                ? null
                : _isEmpty(sectionErrors[activeContent])
                  ? <p>~</p>
                  : <p>*</p>
              }
            </li>
          ))}
        </ul>

        <div className='hfui-strategyeditor__content-wrapper'>
          <div
            className={ClassNames('hfui-strategyeditor__editor-wrapper', {
              noresults: !renderResults,
              maximised: editorMaximised,
            })}
          >
            <CodeMirror
              value={strategy[activeContent] || ''}
              onBeforeChange={this.onEditorContentChange}
              options={{
                mode: {
                  name: 'javascript',
                  json: true,
                },

                theme: 'tomorrow-night-eighties',
                lineNumbers: true,
                tabSize: 2,
              }}
            />

            {/*
              <SRD.DiagramWidget diagramEngine={engine} />
            */}

            {execError || sectionErrors[activeContent] ? (
              <div className='hfui-strategyeditor__editor-error-output'>
                <i
                  className='fas fa-times-circle'
                  onClick={this.onClearError}
                />

                <pre>{execError || sectionErrors[activeContent]}</pre>
              </div>
            ) : null}
          </div>

          {renderResults && (
            <div className='hfui-strategyeditor__results-outer'>
              <Results
                results={results}
                execRunning={execRunning}
                currentTick={currentTick}
                totalTicks={totalTicks}
              />
            </div>
          )}
        </div>
      </div>,
    )
  }
}
