import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _last from 'lodash/last'
import _entries from 'lodash/entries'
import _reduce from 'lodash/reduce'
import _keys from 'lodash/keys'
import { Responsive as RGL, WidthProvider } from 'react-grid-layout'
import { getLocation } from '../../redux/selectors/router'
import {
  removeComponent,
  changeLayout,
  setLayoutID,
  storeUnsavedLayout,
  setLayouts,
} from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { renderLayoutElement } from './GridLayout.helpers'
import './style.css'
import { LOADING_LAYOUT } from '../../constants/layouts'

import {
  getLayouts,
  getLayoutID,
  getCurrentUnsavedLayout,
  getIsWsLayoutsSet,
} from '../../redux/selectors/ui'
import {
  getLayouts as getWsLayouts,
  getAuthToken,
} from '../../redux/selectors/ws'

const ReactGridLayout = WidthProvider(RGL)

const GridLayout = ({
  sharedProps, tradesProps, bookProps, chartProps, orderFormProps,
}) => {
  const dispatch = useDispatch()
  const authToken = useSelector(getAuthToken)
  const { pathname } = useSelector(getLocation)
  const layouts = useSelector(getLayouts)
  console.log('TCL: layouts', layouts)
  const wsLayouts = useSelector(getWsLayouts)
  console.log('TCL: wsLayouts', wsLayouts)
  const isWsLayoutsSet = useSelector(getIsWsLayoutsSet)
  const layoutID = useSelector(getLayoutID)
  const currentSavedLayout = _get(layouts, layoutID, {})
  const unsavedLayoutDef = useSelector(getCurrentUnsavedLayout)
  const isValidUnsavedLayout = _get(unsavedLayoutDef, 'routePath', null) === pathname
  const isValidSavedLayout = currentSavedLayout.routePath === pathname
  const [lastLayoutID, lastLayoutDef] = _keys(layouts).length
    ? _last(_entries(layouts)
      .filter(([, layout]) => layout.routePath === pathname)
      .sort((a, b) => a[1].savedAt - b[1].savedAt))
    : [null, null]

  // should use unsaved one first, then saved one (if selected) else last saved one
  const layoutDef = isValidUnsavedLayout
    ? unsavedLayoutDef
    : isValidSavedLayout
      ? currentSavedLayout
      : lastLayoutDef

  useEffect(() => {
    // once the saved layouts are fetched from the websocket
    // store it in the redux under ui.layouts
    // once this happens we only reference ui.layouts
    if (!isWsLayoutsSet && wsLayouts) {
      dispatch(setLayouts(wsLayouts))
    }
  }, [isWsLayoutsSet, wsLayouts])

  useEffect(() => {
    // push every layout updates to websocket
    if (isWsLayoutsSet) {
      dispatch(WSActions.send([
        'layouts.save',
        authToken,
        _reduce(
          _entries(layouts),
          (nextLayout, [id, layout]) => {
            // don't save default layouts in db
            if (layout.isDefault) {
              return nextLayout
            }

            return {
              ...nextLayout,
              [id]: layout,
            }
          },
          {},
        ),
      ]))
    }
  }, [isWsLayoutsSet, layouts])

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
      dispatch(storeUnsavedLayout(layoutDef))
    }
  }, [isValidUnsavedLayout, layoutDef])

  useEffect(() => {
    // migrate localStorage to ws
    // _reduce(
    //   _entries(layouts),
    //   (nextLayout, [name, { routePath, ...layoutProps }]) => {
    //     // don't save default layouts in db
    //     if (layoutProps.isDefault) {
    //       return nextLayout
    //     }

    //     const id = `${routePath}:${name}`

    //     return {
    //       ...nextLayout,
    //       [id]: {
    //         ...layoutProps,
    //         name,
    //         routePath,
    //         id,
    //       },
    //     }
    //   },
    //   {},
    // )
  }, [])

  const componentProps = {
    orderForm: orderFormProps,
    trades: tradesProps,
    chart: chartProps,
    book: bookProps,
    dark: true,
    sharedProps,
  }

  const currentLayouts = isWsLayoutsSet
    ? _get(layoutDef, 'layout', [])
    : _get(LOADING_LAYOUT, 'layout')
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
        PropTypes.bool,
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
  orderFormProps: { orders: [] },
  sharedProps: {},
}

export default memo(GridLayout)
