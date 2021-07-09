import { connect } from 'react-redux'
import { reduxActions } from '@ufx-ui/bfx-containers'
import _get from 'lodash/get'

import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getCurrentMode } from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'
import HFUI from './HFUI'

const mapStateToProps = (state = {}) => {
  const { ui } = state
  const { notificationsVisible } = ui

  return {
    authToken: getAuthToken(state),
    notificationsVisible,
    currentMode: getCurrentMode(state),
    settingsShowAlgoPauseInfo: _get(ui, 'settings.showAlgoPauseInfo', null),
  }
}

const mapDispatchToProps = dispatch => ({
  getSettings: (authToken) => {
    dispatch(WSActions.send(['get.settings', authToken]))
  },
  GAPageview: (page) => {
    dispatch(GAActions.pageview(page))
  },
  getFavoritePairs: (authToken, mode) => {
    dispatch(WSActions.send([
      'get.favourite_trading_pairs',
      authToken,
      mode,
    ]))
  },
  onUnload: (authToken, mode) => {
    dispatch(WSActions.onUnload(authToken, mode))
  },
  subscribeAllTickers: () => {
    dispatch(reduxActions.fetchAllTickersPeriodically())
  },
  shouldShowAOPauseModalState: () => {
    dispatch(WSActions.send(['get.show_algo_pause_info']))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HFUI)
