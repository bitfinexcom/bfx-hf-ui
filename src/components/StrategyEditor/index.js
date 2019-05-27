import React from 'react'
import ClassNames from 'classnames'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import Panel from '../../ui/Panel'

export default class StrategyEditor extends React.PureComponent {
  state = {
    dataKey: '',
    editorContent: '',
    unsavedBuffers: {},
    activeMethod: null,
    dirty: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { strategy } = nextProps
    const strategyMethods = Object.keys(strategy)
    const dataKey = strategyMethods.join('|')
    const prevDataKey = prevState.dataKey

    if (dataKey === prevDataKey) {
      return null
    }

    return {
      dataKey,
      strategyMethods,
    }
  }

  constructor(props) {
    super(props)

    this.onContentChange = this.onContentChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onContentChange(editor, data, editorContent) {
    const { activeMethod } = this.state
    const { strategy } = this.props

    this.setState(() => ({
      dirty: strategy[activeMethod] !== editorContent,
      editorContent,
    }))
  }

  onSave() {
    const { activeMethod, editorContent } = this.state
    const { onSaveMethod } = this.props

    onSaveMethod(activeMethod, editorContent)

    this.setState((state) => {
      const { unsavedBuffers } = state
      delete unsavedBuffers[activeMethod]

      return {
        unsavedBuffers,
        dirty: false,
      }
    })
  }

  onSelectMethod(m) {
    const { dirty, editorContent, activeMethod } = this.state
    const { strategy } = this.props

    this.setState((state) => {
      const { unsavedBuffers } = this.state

      if (dirty && editorContent.length > 0) {
        unsavedBuffers[activeMethod] = editorContent
      }

      return {
        editorContent: unsavedBuffers[m] || strategy[m],
        activeMethod: m,
        unsavedBuffers,
        dirty: false,
      }
    })
  }

  render() {
    const { onEval } = this.props
    const {
      strategyMethods, editorContent, activeMethod, unsavedBuffers, dirty,
    } = this.state

    return (
      <Panel
        label='Strategy Editor'
        contentClassName='strategy_editor__wrapper'
      >
        <div className='strategy_editor__header'>
          <button
            className='bp3-button bp3-icon-floppy-disk bp3-minimal'
            disabled={!dirty && !unsavedBuffers[activeMethod]}
            onClick={this.onSave}
          >
Save
          </button>

          <button
            className='bp3-button bp3-icon-play bp3-minimal'
            onClick={onEval}
          >
Eval
          </button>
        </div>

        <div className='strategy_editor__content'>
          <ul className='strategy_editor__sidebar'>
            {strategyMethods.map(m => (
              <li
                key={m}
                onClick={this.onSelectMethod.bind(this, m)}
                className={ClassNames({
                  active: m === activeMethod,
                })}
              >
                <p>{m}</p>

                {(unsavedBuffers[m] || (m === activeMethod && dirty)) && (
                <p>M</p>
                )}
              </li>
            ))}
          </ul>

          <div className='strategy_editor__editor'>
            <CodeMirror
              onChange={this.onContentChange}
              value={editorContent}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
              }}
            />
          </div>
        </div>
      </Panel>
    )
  }
}
