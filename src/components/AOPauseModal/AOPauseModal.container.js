import { connect } from 'react-redux'
import _get from 'lodash/get'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getIsAOPausedModalVisible } from '../../redux/selectors/ui'
import { getAuthToken } from '../../redux/selectors/ws'

import AOPauseModal from './AOPauseModal'

const mapStateToProps = (state = {}) => ({
  authToken: getAuthToken(state),
  dms: _get(state, 'ui.settings.dms', null),
  ga: _get(state, 'ui.settings.ga', null),
  visible: getIsAOPausedModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  changeAOPauseModalState: (visible) => {
    dispatch(UIActions.changeAOPauseModalState(visible))
  },
  onDontShowAgain: (authToken, dms, ga) => {
    dispatch(WSActions.send([
      'settings.update', authToken, dms, ga, false,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AOPauseModal)
