import { connect } from 'react-redux'
import { STRATEGY_PAGE } from '../../redux/constants/ui'
import UIActions from '../../redux/actions/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = state => ({
  firstLogin: state.ui.firstLogin,
  isGuideActive: state.ui[`${STRATEGY_PAGE}_GUIDE_ACTIVE`],
  strategyId: state.ui.id,
}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  finishGuide() {
    dispatch(UIActions.finishGuide(STRATEGY_PAGE))
  },
  setStrategyContent(content) {
    dispatch(UIActions.updateStrategyContent(content))
  },
  selectStrategy() {
    dispatch(UIActions.strategySelect())
  },
}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
