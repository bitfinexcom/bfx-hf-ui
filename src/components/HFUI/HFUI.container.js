import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'

import { updateGithubAppVersion } from '../../redux/actions/data'
import { getActiveMarket } from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'

import HFUI from './HFUI'

const mapStateToProps = (state = {}) => {
  const { router, meta } = state
  const { location } = router
  const { pathname } = location
  const { ui } = state
  const { notificationsVisible, settings = {} } = ui
  const { ReactGA } = meta
  const { ga } = settings

  return {
    currentPage: pathname,
    activeMarket: getActiveMarket(state),
    authToken: getAuthToken(state),
    notificationsVisible,
    ReactGA,
    ga
  }
}

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },
  getLastVersion: () => {
    dispatch(updateGithubAppVersion())
  },
  getSettings: (authToken) => {
    dispatch(WSActions.send(['get.settings', authToken]))
  },
  saveActiveMarket: (market) => {
    dispatch(UIActions.saveActiveMarket(market))
  },

  navigate: (route) => {
    dispatch(UIActions.setRoute(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
