import React from 'react'

import Modal from 'react-modal'
import MonacoEditor from 'react-monaco-editor'
import { Icon } from '@blueprintjs/core'
import axios from 'axios'

import { defaultProps, propTypes } from './CodeEditor.props'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    width: '85%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#161E24',
    border: 'none',
    position: 'relative',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
}

export default class CodeEditor extends React.Component {
  static defaultProps = defaultProps

  static propTypes = propTypes

  componentDidMount() {
    this.code = ''
  }

  onChange(code) {
    this.code = code
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    this.editor = editor
  }

  toggleModal() {
    const { editorOpened, toggleEditor } = this.props
    toggleEditor(!editorOpened)
  }


  saveCode() {
    axios({
      method: 'POST',
      url: 'save_order_definition/',
      params: {
        code: this.code,
      },
    })
    this.toggleModal()
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    }
    const { editorOpened, code = '' } = this.props
    return (
      <Modal
        isOpen={editorOpened}
        contentLabel='Code Editor'
        style={customStyles}
      >
        <div>
          <Icon
            className='hfui__close-modal-button'
            icon='cross'
            key='cross'
            onClick={() => this.toggleModal()}
          />
        </div>
        <hr />
        <div>
          <MonacoEditor
            height='500'
            language='javascript'
            value={code}
            options={options}
            onChange={code => this.onChange(code)}
            theme='vs-dark'
            editorDidMount={this.editorDidMount}
          />
          <button
            type='button'
            className='hfui__add-order-btn hfui__btn-right'
            onClick={() => this.saveCode()}
          >
          Save
          </button>
        </div>

      </Modal>
    )
  }
}
