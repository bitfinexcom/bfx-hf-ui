import { connect } from 'react-redux'

import EditorActions from '../../redux/actions/editor'

import CodeEditorView from './CodeEditor'

const mapStateToProps = (state = {}) => {
  const { editorOpened = false, code = '' } = state.editor

  return {
    editorOpened,
    code,
  }
}

const mapDispatchToProps = dispatch => ({
  toggleEditor: (flag) => {
    dispatch(EditorActions.toggleEditor(flag))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditorView)
