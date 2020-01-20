import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { updateGithubAppVersion } from '../../redux/actions/data'
import { getActiveMarket } from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'

import HFUI from './HFUI'

const mapStateToProps = (state = {}) => {
  const { router } = state
  const { location } = router
  const { pathname } = location
  return {
    currentPage: pathname,
    activeMarket: getActiveMarket(state),
    authToken: getAuthToken(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },
  getLastVersion: () => {
    dispatch(updateGithubAppVersion())
  },
  saveActiveMarket: (market) => {
    dispatch(UIActions.saveActiveMarket(market))
  },

  navigate: (route) => {
    dispatch(UIActions.setRoute(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
