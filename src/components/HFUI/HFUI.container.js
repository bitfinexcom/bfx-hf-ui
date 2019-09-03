import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getActiveMarket } from '../../redux/selectors/ui'

import HFUI from './HFUI'

const mapStateToProps = (state = {}) => ({
  activeMarket: getActiveMarket(state),
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  saveActiveMarket: (market) => {
    dispatch(UIActions.saveActiveMarket(market))
  },

  navigate: (route) => {
    dispatch(UIActions.setRoute(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
