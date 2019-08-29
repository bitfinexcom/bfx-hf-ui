import _keyBy from 'lodash/keyBy'
import adapter from '../../adapters/algo_order'

function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case 'HF_AS_DATA.AOS_MESSAGE': {
      const [, aos] = payload

      return {
        ..._keyBy(aos.map(adapter), ao => ao.gid),
      }
    }

    case 'HF_AS_AO.STOPPED_MESSAGE': {
      const [, gid] = payload
      const { [gid]: _, ...remainingAOs } = state

      return remainingAOs
    }

    case 'HF_AS_AO.STARTED_MESSAGE': {
      const [, ao = []] = payload

      return {
        ...state,
        ..._keyBy([adapter(ao)], o => o.gid),
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
