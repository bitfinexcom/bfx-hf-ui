import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _get from 'lodash/get'
import { Responsive as RGL, WidthProvider } from 'react-grid-layout'

import { renderLayoutElement } from './GridLayout.helpers'
import './style.css'

const GridLayoutP = WidthProvider(RGL)

const GridLayout = ({
  layoutDef, chartProps, bookProps, tradesProps, orderFormProps, ordersProps,
  onRemoveComponent, layoutID, darkPanels, sharedProps, onLayoutChange,
}) => {
  const componentProps = {
    orderForm: orderFormProps,
    trades: tradesProps,
    chart: chartProps,
    orders: ordersProps,
    book: bookProps,
    dark: darkPanels,
    sharedProps,
  }
  const layouts = _get(layoutDef, 'layout', [])

  return (
    <GridLayoutP
      autoSize
      draggableHandle='.icon-move'
      cols={{
        lg: 100, md: 100, sm: 100, xs: 100, xxs: 100,
      }}
      rowHeight={32}
      margin={[20, 20]}
      layouts={{ lg: layouts }}
      breakpoints={{
        lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0,
      }}
      onLayoutChange={onLayoutChange}
    >
      {_map(layouts, def => (
        <div key={def.i}>
          {renderLayoutElement(layoutID, def, componentProps, onRemoveComponent)}
        </div>
      ))}
    </GridLayoutP>
  )
}

GridLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  layoutDef: PropTypes.shape({
    layout: PropTypes.arrayOf(PropTypes.shape({
      i: PropTypes.string.isRequired,
    })),
  }).isRequired,
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
  ordersProps: PropTypes.shape({
    market: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number,
        PropTypes.bool,
      ]),
    ),
  }),
  onRemoveComponent: PropTypes.func.isRequired,
  layoutID: PropTypes.string.isRequired,
  darkPanels: PropTypes.bool,
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
  darkPanels: false,
  sharedProps: {},
}

export default memo(GridLayout)
