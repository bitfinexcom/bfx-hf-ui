import React from 'react'
import Debug from 'debug'
import ClassNames from 'classnames'
import _isError from 'lodash/isError'
import _isEmpty from 'lodash/isEmpty'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import Indicators from 'bfx-hf-indicators'
import { nonce } from 'bfx-api-node-util'

import Templates from './templates'

import StrategyEditorPanel from './StrategyEditorPanel'
import CreateNewStrategyModal from '../CreateNewStrategyModal'
import OpenExistingStrategyModal from '../OpenExistingStrategyModal'
import { propTypes, defaultProps } from './StrategyEditor.props'
import { evalStrategyMethod } from './StrategyEditor.helpers'
import './style.css'

const debug = Debug('hfui-ui:c:strategy-editor')
const STRATEGY_SECTIONS = [
  'defineIndicators',
  'defineMeta',
  'exec',
]

const CODE_MIRROR_OPTIONS = {
  mode: {
    name: 'javascript',
    json: true,
  },

  theme: 'monokai',
  lineNumbers: true,
  tabSize: 2,
}

/**
 * @todo refactor
 *
 * @class
 * @augments React.PureComponent
 */
class StrategyEditor extends React.PureComponent {
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
  }

  constructor(props) {
    super(props)

    this.onClearError = this.onClearError.bind(this)
    this.onOpenSelectModal = this.onOpenSelectModal.bind(this)
    this.onOpenCreateModal = this.onOpenCreateModal.bind(this)
    this.onCloseModals = this.onCloseModals.bind(this)
    this.onCreateNewStrategy = this.onCreateNewStrategy.bind(this)
    this.onSaveStrategy = this.onSaveStrategy.bind(this)
    this.onLoadStrategy = this.onLoadStrategy.bind(this)
    this.onToggleMaximiseEditor = this.onToggleMaximiseEditor.bind(this)
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
    this.updateStrategy(strategy)

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
    this.updateStrategy(strategy)

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

  onEditorContentChange = (code) => {
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

  setSectionError(section, err) {
    this.setState(({ sectionErrors }) => ({
      sectionErrors: {
        ...sectionErrors,
        [section]: _isError(err) ? err.message : err,
      },
    }))
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

    onStrategyChange(strategyContent, strategy)
  }

  clearSectionError(section) {
    this.setSectionError(section, '')
  }

  evalSectionContent(section, contentOverride) {
    const { strategy } = this.state

    evalStrategyMethod({
      section,
      strategy,
      contentOverride,
      onFail: this.setSectionError.bind(this, section),
      onSuccess: this.clearSectionError.bind(this, section),
    })
  }

  renderPanel(content) {
    const {
      strategy, execRunning, strategyDirty, editorMaximised, dark,
    } = this.state

    const { onRemove, moveable, removeable } = this.props

    return (
      <StrategyEditorPanel
        dark={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        execRunning={execRunning}
        strategyDirty={strategyDirty}
        strategy={strategy}
        editorMaximised={editorMaximised}
        onOpenSelectModal={this.onOpenSelectModal}
        onOpenCreateModal={this.onOpenCreateModal}
        onSaveStrategy={this.onSaveStrategy}
        onSwitchEditorMode={this.onSwitchEditorMode}
        onToggleMaximiseEditor={this.onToggleMaximiseEditor}
      >
        {content}
      </StrategyEditorPanel>
    )
  }

  renderEmptyContent() {
    const { gaCreateStrategy } = this.props
    const {
      createNewStrategyModalOpen, openExistingStrategyModalOpen,
    } = this.state

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
              options={CODE_MIRROR_OPTIONS}
              value={strategy[activeContent] || ''}
              onBeforeChange={(_, __, code) => (
                this.onEditorContentChange(code)
              )}
            />

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

export default StrategyEditor
