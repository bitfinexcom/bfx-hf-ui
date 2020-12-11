import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'

import GAActions from '../../redux/actions/google_analytics'
import { updateGithubAppVersion, getTOS } from '../../redux/actions/data'
import { getActiveMarket } from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'

import HFUI from './HFUI'

const mapStateToProps = (state = {}) => {
  const { router } = state
  const { location } = router
  const { pathname } = location
  const { ui, meta } = state
  const { rest } = meta
  const { tos = '' } = rest
  const { notificationsVisible } = ui

  return {
    currentPage: pathname,
    activeMarket: getActiveMarket(state),
    authToken: getAuthToken(state),
    notificationsVisible,
    terms: tos,
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
  getLastTOS: () => {
    dispatch(getTOS())
  },
  navigate: (route) => {
    dispatch(UIActions.setRoute(route))
  },
  GAPageview: (page) => {
    dispatch(GAActions.pageview(page))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
