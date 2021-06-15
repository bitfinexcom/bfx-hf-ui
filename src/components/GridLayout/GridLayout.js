import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { Responsive as RGL, WidthProvider } from 'react-grid-layout'
import { getLocation } from '../../redux/selectors/router'
import {
  removeComponent, changeLayout,
  saveLayout,
  storeUnsavedLayout,
  createLayout,
  deleteLayout,
  // setLayoutID,
} from '../../redux/actions/ui'

import {
  renderLayoutElement,
  COMPONENT_DIMENSIONS,
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
  DEFAULT_LAYOUTS_ID_MAPPING,
  useLayout,
} from './GridLayout.helpers'
import './style.css'

import {
  getLayouts,
  getActiveMarket,
  getCurrentUnsavedLayout,
} from '../../redux/selectors/ui'

import ordersList from '../../orders'

const ReactGridLayout = WidthProvider(RGL)

const orders = Object.values(ordersList).map(uiDef => uiDef())

const GridLayout = (props) => {
  const {
    sharedProps,
    tradesProps,
    bookProps,
    chartProps,
    ordersProps,
    orderFormProps,
  } = props

  const dispatch = useDispatch()
  const { layoutDef, layoutID } = useLayout()
  const activeMarket = useSelector(getActiveMarket)

  const componentProps = {
    orderForm: orderFormProps,
    trades: tradesProps,
    chart: chartProps,
    orders: ordersProps,
    book: bookProps,
    dark: true,
    sharedProps,
  }

  const currentLayouts = _get(layoutDef, 'layout', [])
  const onRemoveComponent = (i) => dispatch(removeComponent({ i, layoutDef }))

  return (
    <div className='hfui-gridlayoutpage__wrapper'>
      <ReactGridLayout
        autoSize
        draggableHandle='.icon-move'
        cols={{
          lg: 100, md: 100, sm: 100, xs: 100, xxs: 100,
        }}
        rowHeight={32}
        margin={[20, 20]}
        layouts={{ lg: currentLayouts }}
        breakpoints={{
          lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0,
        }}
        onLayoutChange={(incomingLayout) => dispatch(changeLayout({ incomingLayout, layoutDef }))}
      >
        {_map(currentLayouts, def => (
          <div key={def.i}>
            {renderLayoutElement(layoutID, def, componentProps, onRemoveComponent)}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  )
}

GridLayout.propTypes = {
  chartProps: PropTypes.shape({
    disableToolbar: PropTypes.bool,
    activeMarket: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number,
      ]),
    ),
  }),
  bookProps: PropTypes.shape({
    canChangeStacked: PropTypes.bool,
  }),
  tradesProps: PropTypes.objectOf(PropTypes.bool),
  orderFormProps: PropTypes.shape({
    orders: PropTypes.arrayOf(PropTypes.object),
  }),
  ordersProps: PropTypes.shape({
    market: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number,
      ]),
    ),
  }),
  sharedProps: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.bool, PropTypes.string],
  )),
}

GridLayout.defaultProps = {
  chartProps: {
    disableToolbar: true,
  },
  bookProps: { canChangeStacked: true },
  tradesProps: {},
  ordersProps: {
    market: {},
  },
  orderFormProps: { orders: [] },
  sharedProps: {},
}

export default memo(GridLayout)
