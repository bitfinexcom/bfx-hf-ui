import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getLayouts, getActiveMarket, getCurrentUnsavedLayout } from '../../redux/selectors/ui'

import GridLayoutPage from './GridLayoutPage'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  layoutDef: getCurrentUnsavedLayout(state),
})

const mapDispatchToProps = {
  saveLayout: UIActions.saveLayout,
  saveLayoutDef: UIActions.storeUnsavedLayout,
  createLayout: UIActions.createLayout,
  deleteLayout: UIActions.deleteLayout,
  setLayoutID: UIActions.setLayoutID,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GridLayoutPage)
