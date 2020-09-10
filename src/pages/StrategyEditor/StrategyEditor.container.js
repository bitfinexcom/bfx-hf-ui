import { connect } from 'react-redux'
import { STRATEGY_PAGE } from '../../redux/constants/ui'
import UIActions from '../../redux/actions/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = state => ({
  firstLogin: state.ui.firstLogin,
  isGuideActive: state.ui[`${STRATEGY_PAGE}_GUIDE_ACTIVE`],
}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  finishGuide() {
    dispatch(UIActions.finishGuide(STRATEGY_PAGE))
  },
}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
