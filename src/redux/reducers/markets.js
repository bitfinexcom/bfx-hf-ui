function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'HF_DS_DATA.MARKETS_MESSAGE': {
      const [, symbols, tfs] = payload

      return {
        symbols,
        tfs,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
