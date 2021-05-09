import { connect } from 'react-redux'

import { getComponentState } from '../../redux/selectors/ui'
import { getAllBalances } from '../../redux/selectors/ws'
import UIActions from '../../redux/actions/ui'

import BalancesTablePanel from './BalancesTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    savedState: getComponentState(state, layoutID, 'balances', id),
    balances: getAllBalances(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(BalancesTablePanel)
