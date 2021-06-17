import _get from 'lodash/get'
import { REDUCER_PATHS } from '../../config'

const path = REDUCER_PATHS.WS

const EMPTY_ARR = []

export default (state) => {
  return _get(state, `${path}.favoriteTradingPairs.favoritePairs`, EMPTY_ARR)
}
