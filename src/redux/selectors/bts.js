import _get from 'lodash/get'

export default function getBTs (state) {
  return _get(state, 'data.bts', {})
}
