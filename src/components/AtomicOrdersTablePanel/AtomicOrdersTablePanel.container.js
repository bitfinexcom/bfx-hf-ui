import { connect } from 'react-redux'

import { getComponentState, getActiveMarket } from '../../redux/selectors/ui'
import { getAllOrders } from '../../redux/selectors/ws'
import UIActions from '../../redux/actions/ui'

import AtomicOrdersTablePanel from './AtomicOrdersTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    savedState: getComponentState(state, layoutID, 'atomic-orders', id),
    activeMarket: getActiveMarket(state),
    atomicOrders: getAllOrders(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
  setFilteredValueWithKey: (key, value) => {
    dispatch(UIActions.setFilteredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTablePanel)
