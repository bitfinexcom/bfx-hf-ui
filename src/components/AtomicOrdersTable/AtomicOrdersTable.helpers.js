import { ORDERS_KEYS } from 'ufx-ui'
import _split from 'lodash/split'
import _head from 'lodash/head'
import _get from 'lodash/get'

const {
  BASE_CCY,
  PLACED,
  PAIR,
} = ORDERS_KEYS

const getBaseCCY = (pair) => _head(_split(pair, ':'))

export const ROW_MAPPING = {
  [BASE_CCY]: {
    format: (value, _, data) => getBaseCCY(_get(data, 'originalAmount')),
  },
  [PAIR]: {
    format: (value, _, data) => _get(data, 'symbol'),
  },
  [PLACED]: {
    format: (value, _, data) => _get(data, 'created'),
  },
}
