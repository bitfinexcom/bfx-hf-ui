import React, { memo, useState } from 'react'
import Debug from 'debug'
import ClassNames from 'classnames'
import _ from 'lodash'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import Indicators from 'bfx-hf-indicators'
import { nonce } from 'bfx-api-node-util'
import HFS from 'bfx-hf-strategy'
import HFU from 'bfx-hf-util'
import PropTypes from 'prop-types'

import Templates from './templates'
import StrategyEditorPanel from './StrategyEditorPanel'
import CreateNewStrategyModal from '../CreateNewStrategyModal'
import RemoveExistingStrategyModal from '../RemoveExistingStrategyModal'
import OpenExistingStrategyModal from '../OpenExistingStrategyModal'

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

const StrategyEditor = ({
  moveable, removeable, strategyId, renderResults, onSave, onRemove, authToken, onStrategyChange, onStrategySelect,
  gaCreateStrategy, onIndicatorsChange, clearBacktestOptions, strategyContent, strategies, backtestResults,
}) => {
  const [strategy, setStrategy] = useState(strategyContent)
  const [sectionErrors, setSectionErrors] = useState({})
  const [strategyDirty, setStrategyDirty] = useState(false)
  const [isRemoveModalOpened, setIsRemoveModalOpened] = useState(false)
  const [activeContent, setActiveContent] = useState('defineIndicators')
  const [createNewStrategyModalOpen, setCreateNewStrategyModalOpen] = useState(false)
  const [openExistingStrategyModalOpen, setOpenExistingStrategyModalOpen] = useState(false)
  const [execError, setExecError] = useState('')

  const processStrategy = (updatedStrategy) => {
    const { id, label } = updatedStrategy
    const updatedContent = { id, label }
    setStrategy(updatedStrategy)

    for (let i = 0; i < STRATEGY_SECTIONS.length; ++i) {
      const section = STRATEGY_SECTIONS[i]
      const content = updatedStrategy[section]

      if (!_isEmpty(content)) {
        updatedContent[section] = content
      }
    }

    return updatedContent
  }

  const selectStrategy = (selected) => {
    const content = processStrategy(selected)
    onStrategySelect(content)
    clearBacktestOptions()
  }

  const setSectionError = (section, error) => {
    setSectionErrors({
      ...sectionErrors,
      [section]: error,
    })
  }

  const clearSectionError = (section) => {
    setSectionError(section, '')
  }

  const processSectionError = (section, e) => {
    if (e.lineNumber && e.columnNumber) {
      // currently it's a non-standard property supported by Firefox only :(
      setSectionError(section, `Line ${e.lineNumber}:${e.columnNumber}: ${e.message}`)
    } else {
      setSectionError(section, e.message)
    }
  }

  const evalSectionContent = (section, providedContent) => {
    const content = providedContent || strategy[section] || ''

    if (section.substring(0, 6) === 'define') {
      try {
        const func = eval(content) // eslint-disable-line
        clearSectionError(section)
        return func
      } catch (e) {
        processSectionError(section, e)
        return null
      }
    } else if (section.substring(0, 2) === 'on') {
      try {
        const func = eval(content)({ HFS, HFU, _ }) // eslint-disable-line
        clearSectionError(section)
        return func
      } catch (e) {
        processSectionError(section, e)
        return null
      }
    } else {
      debug('unrecognised section handler prefix: %s', section)
      return null
    }
  }

  const onDefineIndicatorsChange = (content) => {
    const indicatorFunc = evalSectionContent('defineIndicators', content)
    let indicators = {}

    if (indicatorFunc) {
      try {
        indicators = indicatorFunc(Indicators)
      } catch (e) {
        processSectionError('defineIndicators', e)
      }
    }

    Object.values(indicators).forEach((i) => {
      i.key = `${nonce()}` // eslint-disable-line
    })

    onIndicatorsChange(indicators)
  }

  const onCreateNewStrategy = (label, templateLabel) => {
    const newStrategy = { label }
    const template = _find(Templates, t => t.label === templateLabel)

    if (!template) {
      debug('unknown template: %s', templateLabel)
    }

    const templateSections = Object.keys(template)

    templateSections.forEach((s) => {
      if (s === 'label') return

      newStrategy[s] = template[s]
    })

    setSectionErrors({})
    setStrategyDirty(true)
    selectStrategy(newStrategy)

    if (newStrategy.defineIndicators) {
      onDefineIndicatorsChange(newStrategy.defineIndicators)
    }
  }

  const onLoadStrategy = (newStrategy) => {
    setSectionErrors({})
    setStrategyDirty(false)
    selectStrategy(newStrategy)

    if (newStrategy.defineIndicators) {
      onDefineIndicatorsChange(newStrategy.defineIndicators)
    }
  }

  const onCloseModals = () => {
    setOpenExistingStrategyModalOpen(false)
    setCreateNewStrategyModalOpen(false)
    setIsRemoveModalOpened(false)
  }

  const onClearErrors = () => {
    setSectionErrors({})
    setExecError('')
  }

  const onSaveStrategy = () => {
    onSave(authToken, { id: strategyId, ...strategy })
    setStrategyDirty(false)
    onCloseModals()
  }

  const onRemoveStrategy = () => {
    const { id = strategyId } = strategy
    onRemove(authToken, id)
    setStrategy(null)
    onStrategyChange(null)
    onCloseModals()
  }

  const updateStrategy = (updatedStrategy) => {
    const content = processStrategy(updatedStrategy)
    onStrategyChange(content)
  }

  const onEditorContentChange = (editor, data, code) => {
    setStrategyDirty(true)
    updateStrategy({
      ...strategy,
      [activeContent]: code,
    })

    if (activeContent === 'defineIndicators') {
      onDefineIndicatorsChange(code) // tracks errors
    } else {
      evalSectionContent(activeContent, code)
    }
  }

  const renderPanel = (content) => (
    <StrategyEditorPanel
      onRemove={onRemove}
      moveable={moveable}
      removeable={removeable}
      execRunning={backtestResults.executing || backtestResults.loading}
      strategyDirty={strategyDirty}
      strategy={strategy}
      strategies={strategies}
      strategyId={strategyId}
      onOpenSelectModal={() => setOpenExistingStrategyModalOpen(true)}
      onOpenCreateModal={() => setCreateNewStrategyModalOpen(true)}
      onOpenRemoveModal={() => setIsRemoveModalOpened(true)}
      onSaveStrategy={onSaveStrategy}
      onRemoveStrategy={onRemoveStrategy}
    >
      {content}
    </StrategyEditorPanel>
  )

  const renderEmptyContent = () => (
    <div className='hfui-strategyeditor__empty-content'>
      <div>
        <p className='button' onClick={() => setCreateNewStrategyModalOpen(true)}>
          Create
        </p>
        <p>a new strategy</p>
        {!_isEmpty(strategies) ? (
          <>
            <p>or</p>
            <p className='button' onClick={() => setOpenExistingStrategyModalOpen(true)}>
              open
            </p>
            <p>an existing one.</p>
          </>
        ) : (
          <p>to begin backtesting.</p>
        )}
      </div>
      <CreateNewStrategyModal
        isOpen={createNewStrategyModalOpen}
        gaCreateStrategy={gaCreateStrategy}
        onClose={onCloseModals}
        onSubmit={onCreateNewStrategy}
      />
      <OpenExistingStrategyModal
        isOpen={openExistingStrategyModalOpen}
        onClose={onCloseModals}
        onOpen={onLoadStrategy}
      />
    </div>
  )

  if (!strategy || _isEmpty(strategy)) {
    return renderPanel(renderEmptyContent())
  }

  return renderPanel(
    <div className='hfui-strategyeditor__wrapper'>
      <CreateNewStrategyModal
        isOpen={createNewStrategyModalOpen}
        gaCreateStrategy={gaCreateStrategy}
        onClose={onCloseModals}
        onSubmit={onCreateNewStrategy}
      />
      <OpenExistingStrategyModal
        isOpen={openExistingStrategyModalOpen}
        onClose={onCloseModals}
        onOpen={onLoadStrategy}
      />
      <RemoveExistingStrategyModal
        isOpen={isRemoveModalOpened}
        onClose={onCloseModals}
        onRemoveStrategy={onRemoveStrategy}
        strategy={strategy}
      />
      <ul className='hfui-strategyeditor__func-select'>
        {STRATEGY_SECTIONS.map(section => (
          <li
            key={section}
            onClick={() => setActiveContent(section)}
            className={ClassNames({
              active: activeContent === section,
              hasError: !!sectionErrors[section],
            })}
          >
            <p>{section}</p>

            {_isEmpty(strategy[section])
              ? null
              : _isEmpty(sectionErrors[section])
                ? <p>~</p>
                : <p>*</p>}
          </li>
        ))}
      </ul>

      <div className='hfui-strategyeditor__content-wrapper'>
        <div
          className={ClassNames('hfui-strategyeditor__editor-wrapper', {
            noresults: !renderResults,
            'exec-error': execError || sectionErrors[activeContent],
          })}
        >
          <CodeMirror
            value={strategy[activeContent] || ''}
            onBeforeChange={onEditorContentChange}
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
          {(execError || sectionErrors[activeContent]) && (
            <div className='hfui-strategyeditor__editor-error-output'>
              <p className='hfui-panel__close strategyeditor__close-icon' onClick={onClearErrors}>&#10005;</p>
              <pre>{execError || sectionErrors[activeContent]}</pre>
            </div>
          )}
        </div>
      </div>
    </div>,
  )
}

StrategyEditor.propTypes = {
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  strategyId: PropTypes.string,
  renderResults: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  onStrategyChange: PropTypes.func.isRequired,
  onStrategySelect: PropTypes.func.isRequired,
  gaCreateStrategy: PropTypes.func.isRequired,
  onIndicatorsChange: PropTypes.func.isRequired,
  clearBacktestOptions: PropTypes.func.isRequired,
  strategyContent: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired,
    ]),
  ),
  strategies: PropTypes.arrayOf(PropTypes.object).isRequired,
  backtestResults: PropTypes.objectOf(PropTypes.any),
}

StrategyEditor.defaultProps = {
  strategyId: '',
  moveable: false,
  removeable: false,
  renderResults: true,
  strategyContent: {},
  backtestResults: {},
}

export default memo(StrategyEditor)
