import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import {
  getIsInternetConnectionModalVisible,
} from '../../redux/selectors/ui'

import BadConnectionModal from './BadConnectionModal'

const mapStateToProps = (state = {}) => ({
  visible: getIsInternetConnectionModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  changeBadInternetConnectionState: (visible) => dispatch(UIActions.changeBadInternetConnectionState(visible)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BadConnectionModal)
