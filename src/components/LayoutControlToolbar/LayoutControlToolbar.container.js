import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getLayouts } from '../../redux/selectors/ui'

import LayoutControlToolbar from './LayoutControlToolbar'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  lang: state.ui.lang,
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  createLayout: (id, tradingEnabled) => {
    dispatch(UIActions.createLayout(id, tradingEnabled))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutControlToolbar)
