function toggleEditor(flag) {
  return {
    type: 'TOGGLE_EDITOR',
    payload: {
      editorOpened: flag,
      code: '// some code',
    },
  }
}

export default {
  toggleEditor,
}
