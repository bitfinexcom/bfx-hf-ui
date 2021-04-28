import React from 'react'
import _isEqual from 'lodash/isEqual'
import _min from 'lodash/min'
import _max from 'lodash/max'
import PropTypes from 'prop-types'
import { nonce } from 'bfx-api-node-util'

import AddLayoutComponentModal from '../AddLayoutComponentModal'
import CreateNewLayoutModal from '../CreateNewLayoutModal'
import LayoutControlToolbar from '../LayoutControlToolbar'
import GridLayout from '../GridLayout'
import StatusBar from '../StatusBar'

import {
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
} from './GridLayoutPage.helpers'

import {
  COMPONENT_DIMENSIONS,
} from '../GridLayout/GridLayout.helpers'

import BitfinexOrders from '../../orders/bitfinex'

const orderDefinitions = {
  bitfinex: Object.values(BitfinexOrders).map(uiDef => uiDef()),
}

class GridLayoutPage extends React.PureComponent {
  state = {
    layoutDirty: false,
    addLayoutModalOpen: false,
    addComponentModalOpen: false,
  }

  constructor(props) {
    super(props)

    this.onSaveLayout = this.onSaveLayout.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onAddComponentToLayout = this.onAddComponentToLayout.bind(this)
    this.onRemoveComponentFromLayout = this.onRemoveComponentFromLayout.bind(this)
    this.onCreateNewLayout = this.onCreateNewLayout.bind(this)
    this.onChangeLayout = this.onChangeLayout.bind(this)
    this.onDeleteLayout = this.onDeleteLayout.bind(this)
    this.onToggleCreateNewLayoutModal = this.onToggleCreateNewLayoutModal.bind(this)
    this.onToggleAddComponentModal = this.onToggleAddComponentModal.bind(this)

    this.state = {
      ...this.state,

      layoutID: props.defaultLayoutID,
      layoutDef: props.layouts[props.defaultLayoutID],
    }
  }

  onLayoutChange(incomingLayout) {
    const { tradingEnabled } = this.props
    const { layoutDef } = this.state

    const currentLayout = layoutDefToGridLayout(layoutDef)
    const newLayout = layoutDefToGridLayout({ layout: incomingLayout })

    if (!_isEqual(currentLayout, newLayout)) {
      this.setState(() => ({ layoutDirty: true }))
    }

    this.setState(() => ({
      layoutDef: gridLayoutToLayoutDef({
        canDelete: layoutDef.canDelete,
        type: tradingEnabled ? 'trading' : 'data',
        layout: incomingLayout,
      }, layoutDef),
    }))
  }

  onSaveLayout() {
    const { saveLayout } = this.props
    const { layoutDef, layoutID } = this.state

    saveLayout(layoutDef, layoutID)

    this.setState(() => ({ layoutDirty: false }))
  }

  onAddComponentToLayout(component) {
    this.setState(({ layoutDef }) => ({
      layoutDef: {
        ...layoutDef,

        layout: [
          ...layoutDef.layout,

          {
            i: `${nonce()}`,
            c: component,
            x: _min(layoutDef.layout.map(l => l.x)) || 0,
            y: _max(layoutDef.layout.map(l => l.y)) || 0,
            ...COMPONENT_DIMENSIONS[component],
          },
        ],
      },
    }))
  }

  onRemoveComponentFromLayout(i) {
    this.setState(({ layoutDef }) => {
      const index = layoutDef.layout.findIndex(l => l.i === i)
      const newLayoutDef = { ...layoutDef }

      if (index >= 0) {
        newLayoutDef.layout.splice(index, 1)
      }

      return { layoutDef: newLayoutDef }
    })
  }

  onCreateNewLayout(layoutName) {
    const { createLayout, tradingEnabled } = this.props

    createLayout(layoutName, tradingEnabled)

    setTimeout(() => {
      const { layouts } = this.props

      this.setState(() => ({
        addLayoutModalOpen: false,
        layoutID: layoutName,
        layoutDef: layouts[layoutName],
      }))
    }, 500)
  }

  onToggleCreateNewLayoutModal() {
    this.setState(({ addLayoutModalOpen }) => ({
      addLayoutModalOpen: !addLayoutModalOpen,
    }))
  }

  onToggleAddComponentModal() {
    this.setState(({ addComponentModalOpen }) => ({
      addComponentModalOpen: !addComponentModalOpen,
    }))
  }

  onChangeLayout(id) {
    const { layouts } = this.props

    this.setState(() => ({
      layoutID: id,
      layoutDef: layouts[id],
    }))
  }

  onDeleteLayout() {
    const { layoutID } = this.state
    const { deleteLayout, layouts, defaultLayoutID } = this.props
    deleteLayout(layoutID)

    this.setState(() => ({
      layoutID: defaultLayoutID,
      layoutDef: layouts[defaultLayoutID],
    }))
  }

  render() {
    const {
      layoutDef, layoutID, layoutDirty, addLayoutModalOpen,
      addComponentModalOpen,
    } = this.state

    const {
      activeMarket, layouts, tradingEnabled, chartProps, bookProps, tradesProps,
      ordersProps, orderFormProps, sharedProps, darkPanels, showToolbar,
    } = this.props

    return (
      <div className='hfui-gridlayoutpage__wrapper'>
        {showToolbar && (
          <LayoutControlToolbar
            tradingEnabled={tradingEnabled}
            activeLayout={layoutDef}
            activeLayoutID={layoutID}
            layoutDirty={layoutDirty}
            layouts={layouts}
            onDeleteLayout={this.onDeleteLayout}
            onSaveLayout={this.onSaveLayout}
            onAddLayout={this.onToggleCreateNewLayoutModal}
            onAddComponent={this.onToggleAddComponentModal}
            onChangeLayout={this.onChangeLayout}
          />
        )}

        {addLayoutModalOpen && (
          <CreateNewLayoutModal
            onClose={this.onToggleCreateNewLayoutModal}
            onSubmit={this.onCreateNewLayout}
          />
        )}

        {addComponentModalOpen && (
          <AddLayoutComponentModal
            onClose={this.onToggleAddComponentModal}
            onSubmit={this.onAddComponentToLayout}
          />
        )}

        <GridLayout
          darkPanels={darkPanels}
          layoutDef={layoutDef}
          layoutID={layoutID}
          chartProps={({
            activeMarket,
            disableToolbar: true,
            ...chartProps,
          })}
          bookProps={{ canChangeStacked: true, ...bookProps }}
          tradesProps={{ ...tradesProps }}
          ordersProps={({
            market: activeMarket,
            ...ordersProps,
          })}
          sharedProps={{ ...sharedProps }}
          orderFormProps={({
            orders: orderDefinitions,
            ...orderFormProps,
          })}
          onLayoutChange={this.onLayoutChange}
          onRemoveComponent={this.onRemoveComponentFromLayout}
        />
      </div>
    )
  }
}

GridLayoutPage.propTypes = {
  defaultLayoutID: PropTypes.string.isRequired,
  layouts: PropTypes.objectOf(PropTypes.object).isRequired,
  tradingEnabled: PropTypes.bool,
  darkPanels: PropTypes.bool,
  showToolbar: PropTypes.bool,
  sharedProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])),
  saveLayout: PropTypes.func.isRequired,
  createLayout: PropTypes.func.isRequired,
  deleteLayout: PropTypes.func.isRequired,
  bookProps: PropTypes.objectOf(PropTypes.bool),
  tradesProps: PropTypes.objectOf(PropTypes.bool),
  ordersProps: PropTypes.objectOf(PropTypes.bool),
  orderFormProps: PropTypes.objectOf(PropTypes.bool),
  chartProps: PropTypes.objectOf(PropTypes.bool),
  activeMarket: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
}

GridLayoutPage.defaultProps = {
  tradingEnabled: false,
  darkPanels: false,
  showToolbar: true,
  sharedProps: {},
  bookProps: {},
  ordersProps: {},
  orderFormProps: {},
  tradesProps: {},
  chartProps: {},
}

export default GridLayoutPage
