import { connect } from 'react-redux'

import { getComponentState, getActiveExchange } from '../../redux/selectors/ui'
import { getExchanges} from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'

import BalancesTablePanel from './BalancesTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)

  return {
    activeExchange,
    savedState: getComponentState(state, layoutID, 'balances', id),
    exchanges: getExchanges(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesTablePanel)
