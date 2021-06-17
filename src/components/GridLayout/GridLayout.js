import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _last from 'lodash/last'
import _entries from 'lodash/entries'
import { Responsive as RGL, WidthProvider } from 'react-grid-layout'
import { getLocation } from '../../redux/selectors/router'
import {
  removeComponent, changeLayout, setLayoutID, storeUnsavedLayout,
} from '../../redux/actions/ui'
import { renderLayoutElement } from './GridLayout.helpers'
import './style.css'

import {
  getLayouts,
  getLayoutID,
  getCurrentUnsavedLayout,
} from '../../redux/selectors/ui'

const ReactGridLayout = WidthProvider(RGL)

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
  const currentSavedLayout = _get(layouts, layoutID, {})
  const unsavedLayoutDef = useSelector(getCurrentUnsavedLayout)
  const isValidUnsavedLayout = _get(unsavedLayoutDef, 'routePath', null) === pathname
  const isValidSavedLayout = currentSavedLayout.routePath === pathname
  const [lastLayoutID, lastLayoutDef] = _last(_entries(layouts)
    .filter(([, layout]) => layout.routePath === pathname)
    .sort((a, b) => a[1].savedAt - b[1].savedAt))

  // should use unsaved one first, then saved one (if selected) else last saved one
  const layoutDef = isValidUnsavedLayout
    ? unsavedLayoutDef
    : isValidSavedLayout
      ? currentSavedLayout
      : lastLayoutDef

  useEffect(() => {
    // set active layout id when there’s none selected (on initial load)
    // or when switching routes
    if (!layoutID || !isValidSavedLayout) {
      dispatch(setLayoutID(lastLayoutID))
    }
  }, [pathname, layoutID, lastLayoutID, isValidSavedLayout])

  useEffect(() => {
    // discard unsaved layout changes
    if (!isValidUnsavedLayout) {
      dispatch(storeUnsavedLayout(null))
    }
  }, [pathname])

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
        onLayoutChange={(incomingLayout) => dispatch(changeLayout(incomingLayout))}
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
