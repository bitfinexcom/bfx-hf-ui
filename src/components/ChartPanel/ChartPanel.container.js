import { connect } from 'react-redux'

import ChartPanel from './ChartPanel'
import UIActions from '../../redux/actions/ui'
import { getMarkets } from '../../redux/selectors/meta'
import { getActiveMarket, getComponentState } from '../../redux/selectors/ui'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    savedState: getComponentState(state, layoutID, 'trades', id),
    activeMarket: getActiveMarket(state),
    markets: getMarkets(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({ state, layoutID, componentID }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartPanel)
