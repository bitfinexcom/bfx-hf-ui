import React from 'react'
import _get from 'lodash/get'
import {
  OrderHistory as UfxOrderHistory, ORDER_HISTORY_COLUMNS, PrettyValue, FullDate,
} from 'ufx-ui'
import { useSelector } from 'react-redux'
import Panel from '../../ui/Panel'
import { symbolToLabel, getPriceFromStatus, getFormatedStatus } from './OrderHistory.helpers'
import './style.css'

const {
  ICON,
  ID,
  PAIR,
  TYPE,
  BASE_CCY,
  QUOTE_CCY,
  AMOUNT,
  ORIGINAL_AMOUNT,
  PRICE,
  PRICE_AVERAGE,
  PLACED,
  STATUS,
} = ORDER_HISTORY_COLUMNS

export const ROW_MAPPING = {
  [ID]: {
    hidden: true,
  },
  [BASE_CCY]: {
    hidden: true,
  },
  [QUOTE_CCY]: {
    hidden: true,
  },
  [ORIGINAL_AMOUNT]: {
    hidden: true,
  },
  [ICON]: {
    index: 0,
    truncate: true,
  },
  [PAIR]: {
    index: 1,
    truncate: true,
    format: (value, _, data) => {
      return symbolToLabel(_get(data, 'symbol'))
    },
  },
  [AMOUNT]: {
    index: 2,
    truncate: true,
    format: (value, _, data) => {
      return _get(data, 'originalAmount')
    },
    // eslint-disable-next-line react/prop-types, react/display-name
    renderer: ({ formattedValue }) => (formattedValue < 0
      ? <span className='hfui-red'>{formattedValue}</span>
      : <span className='hfui-green'>{formattedValue}</span>
    ),
  },
  [PRICE]: {
    index: 3,
    truncate: true,
  },
  [PRICE_AVERAGE]: {
    index: 4,
    truncate: true,
    // eslint-disable-next-line react/display-name
    format: (_value, _, data) => {
      const val = getPriceFromStatus(_get(data, 'status'))
      return <PrettyValue value={val} sigFig={5} fadeTrailingZeros />
    },
  },
  [TYPE]: {
    index: 5,
    truncate: true,
    cellStyle: { width: '20%' },
  },
  [STATUS]: {
    index: 6,
    truncate: true,
    format: (value, _, data) => {
      return getFormatedStatus(_get(data, 'status'))
    },
  },
  [PLACED]: {
    index: 7,
    // eslint-disable-next-line react/display-name
    format: (value, _, data) => {
      return <FullDate ts={data.created} />
    },
  },
}

export default function OrderHistory(props) {
  const {
    // eslint-disable-next-line react/prop-types
    onRemove, dark,
  } = props

  const orders = useSelector(state => state.ws.orderHistory.orders)

  return (
    <Panel
      label='ORDER HISTORY'
      onRemove={onRemove}
      dark={dark}
      darkHeader={dark}
    >
      <UfxOrderHistory
        orders={orders}
        rowMapping={ROW_MAPPING}
        isMobileLayout={false}
      />
    </Panel>
  )
}
