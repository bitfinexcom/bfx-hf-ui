import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

export default (state) => {
  const currentTest = _get(state, `${path}.backtest.currentTest`, {})
  const loading = _get(state, `${path}.backtest.loading`, false)
  const executing = _get(state, `${path}.backtest.executing`, false)
  return { ...currentTest, loading, executing }
}
