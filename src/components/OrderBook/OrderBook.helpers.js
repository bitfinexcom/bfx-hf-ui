import { BOOK_KEYS as KEYS, BOOK_VIZ_TYPES } from '@ufx-ui/core'

const ROW_MAPPING = {
  [KEYS.ORDER_COUNT]: {
    hidden: true,
  },
  [KEYS.COUNT]: {
    hidden: true,
  },
  [KEYS.TOTAL]: {
    hidden: true,
  },
  [KEYS.AMOUNT]: {
    hidden: true,
  },
}

export const getRowMapping = (sumAmounts) => {
  const rowMapping = ROW_MAPPING
  if (!sumAmounts) {
    rowMapping.total.hidden = true
    rowMapping.amount.hidden = false
  } else if (sumAmounts) {
    rowMapping.total.hidden = false
    rowMapping.amount.hidden = true
  }

  return rowMapping
}

export const getBookViz = (sumAmounts) => (sumAmounts ? BOOK_VIZ_TYPES.CUMULATIVE : BOOK_VIZ_TYPES.AMOUNT)
