
function getInitialState() {
  return {
    editorOpened: false,
    code: `function reducer(state = getInitialState(), action = {}) {
        switch (action.type) {
          case 'TOGGLE_EDITOR': {
            const { editorOpened } = action.payload
            return {
              ...state,
              editorOpened,
            }
          }
          default:
            return state
        }
      }`,
  }
}

function reducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case 'TOGGLE_EDITOR': {
      const { editorOpened } = action.payload
      return {
        ...state,
        editorOpened,
      }
    }
    default:
      return state
  }
}


export default reducer
