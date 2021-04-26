import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getIsInternetConnection } from '../../redux/selectors/ui'

import BadConnectionModal from './BadConnectionModal'

const mapStateToProps = (state = {}) => ({
  visible: getIsInternetConnection(state),
})

const mapDispatchToProps = dispatch => ({
  changeBadInternetConnectionState: (visible) => dispatch(UIActions.changeBadInternetConnectionState(visible)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BadConnectionModal)
