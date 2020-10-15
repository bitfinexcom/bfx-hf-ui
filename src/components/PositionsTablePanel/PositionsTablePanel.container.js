import { connect } from 'react-redux'

import { getComponentState, getActiveExchange } from '../../redux/selectors/ui'
import { getAllPositions } from '../../redux/selectors/ws'
import { getExchanges } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'

import PositionsTablePanel from './PositionsTablePanel'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const activeExchange = getActiveExchange(state)

  return {
    activeExchange,
    savedState: getComponentState(state, layoutID, 'positions', id),
    exchanges: getExchanges(state),
    positions: getAllPositions(state),
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
  setFiltredValueWithKey: (key, value) => {
    dispatch(UIActions.setFiltredValueWithKey(key, value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTablePanel)
