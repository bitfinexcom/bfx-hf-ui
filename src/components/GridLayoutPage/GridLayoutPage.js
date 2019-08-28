import React from 'react'
import _isEqual from 'lodash/isEqual'
import _min from 'lodash/min'
import _max from 'lodash/max'
import { nonce } from 'bfx-api-node-util'

import GridLayout from '../../components/GridLayout'
import StatusBar from '../../components/StatusBar'

import {
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
} from './GridLayoutPage.helpers'

import {
  COMPONENT_DIMENSIONS
} from '../../components/GridLayout/GridLayout.helpers'

import BitfinexOrders from '../../orders/bitfinex'
import BinanceOrders from '../../orders/binance'

const orderDefinitions = {
  bitfinex: Object.values(BitfinexOrders).map(uiDef => uiDef()),
  binance: Object.values(BinanceOrders).map(uiDef => uiDef()),
}

export default class GridLayoutPage extends React.Component {
  state = {
    layoutDirty: false,
  }

  constructor (props) {
    super(props)

    this.onSaveLayout = this.onSaveLayout.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onAddComponentToLayout = this.onAddComponentToLayout.bind(this)
    this.onRemoveComponentFromLayout = this.onRemoveComponentFromLayout.bind(this)
    this.onCreateNewLayout = this.onCreateNewLayout.bind(this)
    this.onChangeLayout = this.onChangeLayout.bind(this)
    this.onDeleteLayout = this.onDeleteLayout.bind(this)

    this.state = {
      ...this.state,

      layoutID: props.defaultLayoutID,
      layoutDef: props.layouts[props.defaultLayoutID],
    }
  }

  onLayoutChange (incomingLayout) {
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
      }, layoutDef)
    }))
  }

  onSaveLayout () {
    const { saveLayout } = this.props
    const { layoutDef, layoutID } = this.state

    saveLayout(layoutDef, layoutID)
   
    this.setState(() => ({ layoutDirty: false }))
  }

  onAddComponentToLayout (component) {
    /*
    if (component === 'CHART') {
      const { user, onUpgrade, onLogin } = this.props
      const { layout } = this.state
      const chartsOnLayout = layout.filter(l => l.c === 'CHART').length

      if (!user || !user.id) {
        return onLogin()
      }

      if (
        ((!user.subscription || user.subscription < 1) && chartsOnLayout >= 1) ||
        (user.subscription === 1 && chartsOnLayout >= 3)
      ) {
        return onUpgrade()
      }
    }
    */

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
          }
        ]
      },
    }))
  }

  onRemoveComponentFromLayout (i) {
    this.setState(({ layoutDef }) => {
      const index = layoutDef.layout.findIndex(l => l.i === i)
      const newLayoutDef = { ...layoutDef }

      if (index >= 0) {
        newLayoutDef.layout.splice(index, 1)
      }

      return { layoutDef: newLayoutDef }
    })
  }

  onCreateNewLayout (layoutName) {
    const {
      /* layouts, user, */ createLayout, /* onUpgrade, onLogin */
      tradingEnabled,
    } = this.props

    /*
    if (!user || !user.id) {
      return onLogin()
    }

    const { subscription } = user

    if (!subscription || subscription < 1) {
      return onUpgrade()
    }

    const nLayouts = Object.values(layouts).length

    if (subscription === 1 && nLayouts >= 3) {
      return onUpgrade()
    }
    */

    createLayout(layoutName, tradingEnabled)

    setTimeout(() => {
      const { layouts } = this.props

      this.setState(() => ({
        layoutID: layoutName,
        layoutDef: layouts[layoutName]
      }))
    }, 0)
  }

  onChangeLayout (id) {
    const { layouts } = this.props

    this.setState(() => ({
      layoutID: id,
      layoutDef: layouts[id],
    }))
  }

  onDeleteLayout (id) {
    const { deleteLayout, layouts, defaultLayoutID } = this.props
    deleteLayout(id)

    this.setState(() => ({
      layoutID: defaultLayoutID,
      layoutDef: layouts[defaultLayoutID],
    }))
  }

  render () {
    const { layoutDef, layoutID, layoutDirty } = this.state
    const {
      activeMarket, layouts, onLogin, onUpgrade, tradingEnabled, chartProps,
      bookProps, tradesProps, ordersProps, orderFormProps,
    } = this.props

    return (
      <div className='dtc-tradingpage__wrapper'>
        <GridLayout
          layoutDef={layoutDef}
          layoutID={layoutID}
          chartProps={({ onLogin, onUpgrade, activeMarket, ...chartProps })}
          bookProps={{ canChangeStacked: true, ...bookProps }}
          tradesProps={{ ...tradesProps }}
          ordersProps={({
            market: activeMarket,
            ...ordersProps,
          })}

          orderFormProps={({
            orders: orderDefinitions,
            onLogin: onLogin,
            ...orderFormProps,
          })}

          onLayoutChange={this.onLayoutChange}
          onRemoveComponent={this.onRemoveComponentFromLayout}
        />

        <StatusBar
          layoutNames={Object.keys(layouts).filter((id) => (
            (layouts[id].type === 'trading' && tradingEnabled) ||
            (layouts[id].type === 'data' && !tradingEnabled)
          ))}

          layoutName={layoutID}
          layoutCanDelete={layoutDef.canDelete}
          layoutDirty={layoutDirty}
          onSaveLayout={this.onSaveLayout}
          onAddComponentToLayout={this.onAddComponentToLayout}
          onCreateNewLayout={this.onCreateNewLayout}
          onChangeLayout={this.onChangeLayout}
          onDeleteLayout={this.onDeleteLayout}
          onLogin={onLogin}
          onUpgrade={onUpgrade}
          allowTradingComponents={tradingEnabled}
        />
      </div>
    )
  }
}
