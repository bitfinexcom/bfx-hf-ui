import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _last from 'lodash/last'
import _findLast from 'lodash/findLast'
import _entries from 'lodash/entries'
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
  setLayoutID,
} from '../../redux/actions/ui'

import {
  renderLayoutElement,
  COMPONENT_DIMENSIONS,
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
} from './GridLayout.helpers'
import './style.css'

import {
  getLayouts,
  getLayoutID,
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
  const { pathname } = useSelector(getLocation)
  const layouts = useSelector(getLayouts)
  const layoutID = useSelector(getLayoutID)
  console.log('TCL: GridLayout -> layoutID', layoutID)
  const unsavedLayoutDef = useSelector(getCurrentUnsavedLayout)
  const isValidUnsavedLayout = _get(unsavedLayoutDef, 'routePath', null) === pathname
  const [lastLayoutID, lastLayoutDef] = _last(_entries(layouts)
    .filter(([, layout]) => layout.routePath === pathname)
    .sort((a, b) => b[1].savedAt - a[1].savedAt))

  const layoutDef = isValidUnsavedLayout
    ? unsavedLayoutDef
    : lastLayoutDef

  // const activeMarket = useSelector(getActiveMarket)

  useEffect(() => {
    const currentSavedLayout = _get(layouts, layoutID, {})
    if (!layoutID || currentSavedLayout.routePath !== pathname) {
      dispatch(setLayoutID(lastLayoutID))
    }
  }, [pathname, layoutID, layoutDef])

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
  const onRemoveComponent = (i) => dispatch(removeComponent(i))

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
        onLayoutChange={(incomingLayout) => {
          console.log('TCL: GridLayout -> incomingLayout', incomingLayout)
          dispatch(changeLayout(incomingLayout))
        }}
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
