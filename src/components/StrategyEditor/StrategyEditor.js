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
import _ from 'lodash'
import * as SRD from '@projectstorm/react-diagrams'

import Templates from './templates'

import StrategyEditorPanel from './StrategyEditorPanel'
import CreateNewStrategyModal from '../CreateNewStrategyModal'
import OpenExistingStrategyModal from '../OpenExistingStrategyModal'
import { propTypes, defaultProps } from './StrategyEditor.props'
import './style.css'

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
    strategy: null,
    strategyDirty: false,
    sectionErrors: {},

    editorMaximised: false,
    createNewStrategyModalOpen: false,
    openExistingStrategyModalOpen: false,
    editorMode: 'visual',
    isRemoveModalOpened: false,
  }

  constructor(props) {
    super(props)

    this.onEditorContentChange = this.onEditorContentChange.bind(this)
    this.onClearError = this.onClearError.bind(this)
    this.onOpenSelectModal = this.onOpenSelectModal.bind(this)
    this.onOpenCreateModal = this.onOpenCreateModal.bind(this)
    this.onCloseModals = this.onCloseModals.bind(this)
    this.onCreateNewStrategy = this.onCreateNewStrategy.bind(this)
    this.onSaveStrategy = this.onSaveStrategy.bind(this)
    this.onRemoveStrategy = this.onRemoveStrategy.bind(this)
    this.onLoadStrategy = this.onLoadStrategy.bind(this)
    this.onToggleMaximiseEditor = this.onToggleMaximiseEditor.bind(this)
    this.onOpenRemoveModal = this.onOpenRemoveModal.bind(this)
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
    }))
    this.selectStrategy(strategy)

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
    this.selectStrategy(strategy)

    if (strategy.defineIndicators) {
      setTimeout(() => {
        this.onDefineIndicatorsChange()
      }, 0)
    }
  }

  onOpenCreateModal() {
    this.setState(() => ({
      createNewStrategyModalOpen: true,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: false,
    }))
  }

  onOpenSelectModal() {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: true,
      isRemoveModalOpened: false,
    }))
  }

  onCloseModals() {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: false,
    }))
  }

  onClearError() {
    this.setState(() => ({
      sectionErrors: {},
      execError: '',
    }))
  }

  onSaveStrategy() {
    const { authToken, onSave, strategyId = '' } = this.props
    const { strategy } = this.state
    if (!('id' in strategy)) {
      strategy.id = strategyId
    }
    onSave(authToken, strategy)

    this.setState(() => ({ strategyDirty: false }))
    this.onCloseModals()
  }
  onOpenRemoveModal() {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: true,
    }))
  }
  onRemoveStrategy() {
    const {
      authToken, onRemove, onStrategyChange, strategyId,
    } = this.props
    const { strategy } = this.state
    const { id = strategyId } = strategy
    onRemove(authToken, id)
    this.setState(() => ({ strategy: null }))
    onStrategyChange(null)
    this.onCloseModals()
  }

  onEditorContentChange(editor, data, code) {
    const { activeContent, strategy } = this.state

    this.setState(() => ({ strategyDirty: true }))
    this.updateStrategy({
      ...strategy,
      [activeContent]: code,
    })

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
  selectStrategy(strategy) {
    const { onStrategySelect } = this.props
    this.setState(() => ({ strategy }))

    const strategyContent = {}
    let section
    for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
      section = STRATEGY_SECTIONS[i]
      const content = strategy[section]

      if (!_isEmpty(content)) {
        strategyContent[section] = content
      }
    }
    onStrategySelect(strategyContent)
  }
  updateStrategy(strategy) {
    const { onStrategyChange } = this.props
    this.setState(() => ({ strategy }))

    const strategyContent = {}
    let section
    for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
      section = STRATEGY_SECTIONS[i]
      const content = strategy[section]

      if (!_isEmpty(content)) {
        strategyContent[section] = content
      }
    }
    onStrategyChange(strategyContent)
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
  renderPanel(content) {
    const {
      strategy, execRunning, strategyDirty, editorMaximised,
      editorMode, dark, isRemoveModalOpened,
    } = this.state

    const {
      moveable, removeable, strategyId, onRemove,
    } = this.props

    return (
      <StrategyEditorPanel
        dark={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        execRunning={execRunning}
        strategyDirty={strategyDirty}
        strategy={strategy}
        strategyId={strategyId}
        editorMode={editorMode}
        editorMaximised={editorMaximised}
        onOpenSelectModal={this.onOpenSelectModal}
        onOpenCreateModal={this.onOpenCreateModal}
        onOpenRemoveModal={this.onOpenRemoveModal}
        onCloseModals={this.onCloseModals}
        onSaveStrategy={this.onSaveStrategy}
        onRemoveStrategy={this.onRemoveStrategy}
        onSwitchEditorMode={this.onSwitchEditorMode}
        onToggleMaximiseEditor={this.onToggleMaximiseEditor}
        isRemoveModalOpened={isRemoveModalOpened}
      >
        {content}
      </StrategyEditorPanel>
    )
  }

  renderEmptyContent() {
    const {
      createNewStrategyModalOpen, openExistingStrategyModalOpen,
    } = this.state
    const { gaCreateStrategy } = this.props

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
            gaCreateStrategy={gaCreateStrategy}
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
    const { renderResults, gaCreateStrategy } = this.props
    const {
      activeContent, execError, strategy, createNewStrategyModalOpen,
      openExistingStrategyModalOpen, sectionErrors, editorMaximised,
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

        {createNewStrategyModalOpen && (
          <CreateNewStrategyModal
            gaCreateStrategy={gaCreateStrategy}
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
                  : <p>*</p>}
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

                theme: 'monokai',
                lineNumbers: true,
                tabSize: 2,
              }}
            />

            <SRD.DiagramWidget diagramEngine={engine} />

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
        </div>
      </div>,
    )
  }
}
