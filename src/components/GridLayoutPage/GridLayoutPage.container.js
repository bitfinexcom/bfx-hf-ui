import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getLayouts, getActiveMarket, getCurrentUnsavedLayout } from '../../redux/selectors/ui'

import GridLayoutPage from './GridLayoutPage'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  layoutDef: getCurrentUnsavedLayout(state),
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  saveLayoutDef: (layout) => {
    dispatch(UIActions.storeUnsavedLayout(layout))
  },

  createLayout: (id, tradingEnabled) => {
    dispatch(UIActions.createLayout(id, tradingEnabled))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GridLayoutPage)
