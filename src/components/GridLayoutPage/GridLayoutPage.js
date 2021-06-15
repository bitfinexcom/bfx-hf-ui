/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'
import _min from 'lodash/min'
import _max from 'lodash/max'
import PropTypes from 'prop-types'
import { nonce } from 'bfx-api-node-util'

import AddLayoutComponentModal from '../AddLayoutComponentModal'
import CreateNewLayoutModal from '../CreateNewLayoutModal'
import GridLayout from '../GridLayout'

import {
  saveLayout,
  storeUnsavedLayout,
  createLayout,
  deleteLayout,
  // setLayoutID,
} from '../../redux/actions/ui'
import {
  getLayouts,
  getActiveMarket,
  getCurrentUnsavedLayout,
} from '../../redux/selectors/ui'

import {
  layoutDefToGridLayout,
  gridLayoutToLayoutDef,
} from './GridLayoutPage.helpers'

import {
  COMPONENT_DIMENSIONS,
} from '../GridLayout/GridLayout.helpers'

import ordersList from '../../orders'

const orders = Object.values(ordersList).map(uiDef => uiDef())

export default function GridLayoutPage(props) {
  const {
    defaultLayoutID,
    sharedProps,
    tradesProps,
    bookProps,
    chartProps,
    ordersProps,
    orderFormProps,
  } = props
  const [layoutID, setLayoutID] = useState(defaultLayoutID)

  const dispatch = useDispatch()
  const layouts = useSelector(getLayouts)
  const activeMarket = useSelector(getActiveMarket)
  const layoutDef = useSelector(getCurrentUnsavedLayout)

  useEffect(() => {
    if (_isEmpty(layoutDef)) {
      dispatch(storeUnsavedLayout(layouts[defaultLayoutID]))
    }
  }, [])

  return (
    <div className='hfui-gridlayoutpage__wrapper'>
      <GridLayout
        layoutDef={layoutDef}
        layoutID={layoutID}
        chartProps={({
          activeMarket,
          disableToolbar: true,
          ...chartProps,
        })}
        bookProps={{
          canChangeStacked: true,
          ...bookProps,
        }}
        tradesProps={{ ...tradesProps }}
        ordersProps={({
          market: activeMarket,
          ...ordersProps,
        })}
        sharedProps={{ ...sharedProps }}
        orderFormProps={({
          orders,
          ...orderFormProps,
        })}
      />
    </div>
  )
}

// class GridLayoutPage extends React.PureComponent {
//   state = {
//     layoutDirty: false,
//     addLayoutModalOpen: false,
//     addComponentModalOpen: false,
//     // eslint-disable-next-line react/destructuring-assignment
//     layoutID: this.props.defaultLayoutID,
//   }

//   componentDidMount() {
//     const { layouts, defaultLayoutID, saveLayoutDef } = this.props
//     saveLayoutDef(layouts[defaultLayoutID])

//   }

//   onLayoutChange = (incomingLayout) => {
//     const { tradingEnabled, layoutDef, saveLayoutDef } = this.props

//     const currentLayout = layoutDefToGridLayout(layoutDef)
//     const newLayout = layoutDefToGridLayout({ layout: incomingLayout })

//     if (!_isEqual(currentLayout, newLayout)) {
//       this.setState(() => ({ layoutDirty: true }))
//     }

//     saveLayoutDef(gridLayoutToLayoutDef({
//       canDelete: layoutDef.canDelete,
//       type: tradingEnabled ? 'trading' : 'data',
//       layout: incomingLayout,
//     }, layoutDef))
//   }

//   onSaveLayout = () => {
//     const { saveLayout, layoutDef } = this.props
//     const { layoutID } = this.state

//     saveLayout(layoutDef, layoutID)

//     this.setState(() => ({ layoutDirty: false }))
//   }

//   onAddComponentToLayout = (component) => {
//     const { layoutDef, saveLayoutDef } = this.props
//     saveLayoutDef({
//       ...layoutDef,
//       layout: [
//         ...layoutDef.layout,
//         {
//           i: `${nonce()}`,
//           c: component,
//           x: _min(layoutDef.layout.map(l => l.x)) || 0,
//           y: _max(layoutDef.layout.map(l => l.y)) || 0,
//           ...COMPONENT_DIMENSIONS[component],
//         },
//       ],
//     })
//   }

//   onRemoveComponentFromLayout = (i) => {
//     const { layoutDef, saveLayoutDef } = this.props
//     const index = layoutDef.layout.findIndex(l => l.i === i)
//     const newLayoutDef = { ...layoutDef }

//     if (index >= 0) {
//       newLayoutDef.layout.splice(index, 1)
//     }

//     saveLayoutDef(newLayoutDef)
//   }

//   onCreateNewLayout = (layoutName) => {
//     const { createLayout, tradingEnabled } = this.props

//     createLayout(layoutName, tradingEnabled)

//     setTimeout(() => {
//       const { layouts, saveLayoutDef } = this.props

//       this.setState(() => ({
//         addLayoutModalOpen: false,
//         layoutID: layoutName,
//       }))

//       saveLayoutDef(layouts[layoutName])
//     }, 500)
//   }

//   onToggleCreateNewLayoutModal = () => {
//     this.setState(({ addLayoutModalOpen }) => ({
//       addLayoutModalOpen: !addLayoutModalOpen,
//     }))
//   }

//   onToggleAddComponentModal = () => {
//     this.setState(({ addComponentModalOpen }) => ({
//       addComponentModalOpen: !addComponentModalOpen,
//     }))
//   }

//   onChangeLayout = (id) => {
//     const { layouts, saveLayoutDef } = this.props

//     this.setState(() => ({
//       layoutID: id,
//     }))
//     saveLayoutDef(layouts[id])
//   }

//   onDeleteLayout = () => {
//     const { layoutID } = this.state
//     const {
//       deleteLayout, layouts, defaultLayoutID, saveLayoutDef,
//     } = this.props
//     deleteLayout(layoutID)

//     this.setState(() => ({
//       layoutID: defaultLayoutID,
//     }))
//     saveLayoutDef(layouts[defaultLayoutID])
//   }

//   render() {
//     const {
//       layoutID, layoutDirty, addLayoutModalOpen,
//       addComponentModalOpen,
//     } = this.state

//     const {
//       layoutDef, activeMarket, layouts, tradingEnabled, chartProps, bookProps, tradesProps, ordersProps, orderFormProps, sharedProps, darkPanels,
//     } = this.props

//     return (
//       <div className='hfui-gridlayoutpage__wrapper'>
//         <CreateNewLayoutModal
//           isOpen={addLayoutModalOpen}
//           onClose={this.onToggleCreateNewLayoutModal}
//           onSubmit={this.onCreateNewLayout}
//         />

//         <AddLayoutComponentModal
//           isOpen={addComponentModalOpen}
//           onClose={this.onToggleAddComponentModal}
//           onSubmit={this.onAddComponentToLayout}
//         />

//         <GridLayout
//           darkPanels={darkPanels}
//           layoutDef={layoutDef}
//           layoutID={layoutID}
//           chartProps={({
//             activeMarket,
//             disableToolbar: true,
//             ...chartProps,
//           })}
//           bookProps={{ canChangeStacked: true, ...bookProps }}
//           tradesProps={{ ...tradesProps }}
//           ordersProps={({
//             market: activeMarket,
//             ...ordersProps,
//           })}
//           sharedProps={{ ...sharedProps }}
//           orderFormProps={({
//             orders,
//             ...orderFormProps,
//           })}
//           onLayoutChange={this.onLayoutChange}
//           onRemoveComponent={this.onRemoveComponentFromLayout}
//         />
//       </div>
//     )
//   }
// }

// GridLayoutPage.propTypes = {
//   defaultLayoutID: PropTypes.string.isRequired,
//   layouts: PropTypes.objectOf(PropTypes.object).isRequired,
//   tradingEnabled: PropTypes.bool,
//   darkPanels: PropTypes.bool,
//   sharedProps: PropTypes.objectOf(PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.bool,
//   ])),
//   saveLayout: PropTypes.func.isRequired,
//   createLayout: PropTypes.func.isRequired,
//   deleteLayout: PropTypes.func.isRequired,
//   saveLayoutDef: PropTypes.func.isRequired,
//   bookProps: PropTypes.objectOf(PropTypes.bool),
//   tradesProps: PropTypes.objectOf(PropTypes.bool),
//   ordersProps: PropTypes.objectOf(PropTypes.bool),
//   orderFormProps: PropTypes.objectOf(PropTypes.bool),
//   chartProps: PropTypes.objectOf(PropTypes.bool),
//   activeMarket: PropTypes.objectOf(
//     PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.array,
//       PropTypes.number,
//     ]),
//   ).isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   layoutDef: PropTypes.object,
// }

// GridLayoutPage.defaultProps = {
//   tradingEnabled: false,
//   darkPanels: false,
//   sharedProps: {},
//   bookProps: {},
//   ordersProps: {},
//   orderFormProps: {},
//   tradesProps: {},
//   chartProps: {},
//   layoutDef: {},
// }

// export default GridLayoutPage
