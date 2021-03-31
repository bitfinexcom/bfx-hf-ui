import { BOOK_KEYS as KEYS, BOOK_VIZ_TYPES } from 'ufx-ui-core'

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
}

export const getRowMapping = (sumAmounts, stackedView) => {
  const rowMapping = ROW_MAPPING
  if (!sumAmounts && !stackedView) {
    rowMapping.total.hidden = true
    rowMapping.amount.hidden = false
  } else if (sumAmounts && !stackedView) {
    rowMapping.total.hidden = false
    rowMapping.amount.hidden = true
  } else if (stackedView) {
    rowMapping.total.hidden = false
    rowMapping.amount.hidden = false
  }

  return rowMapping
}

export const getBookViz = (sumAmounts) => (sumAmounts ? BOOK_VIZ_TYPES.CUMULATIVE : BOOK_VIZ_TYPES.AMOUNT)
