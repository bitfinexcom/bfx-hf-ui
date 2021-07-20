import { connect } from 'react-redux'

import {
  getFirstLogin,
  getGuideStatusForPage,
} from '../../redux/selectors/ui'
import { getLayoutsLoaded } from '../../redux/selectors/ws'

import { MARKET_PAGE } from '../../redux/constants/ui'
import UIActions from '../../redux/actions/ui'
import MarketData from './MarketData'

const mapStateToProps = (state = {}) => ({
  isFirstLogin: getFirstLogin(state),
  isGuideActive: getGuideStatusForPage(state, MARKET_PAGE),
  isLayoutsLoaded: getLayoutsLoaded(state),
})

const mapDispatchToProps = dispatch => ({
  finishGuide() {
    dispatch(UIActions.finishGuide(MARKET_PAGE))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketData)
