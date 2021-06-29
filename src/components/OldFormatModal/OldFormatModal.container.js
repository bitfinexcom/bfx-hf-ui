import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getOldFormatModalState } from '../../redux/selectors/ui'

import OldFormatModal from './OldFormatModal'

const mapStateToProps = (state = {}) => ({
  visible: getOldFormatModalState(state),
})

const mapDispatchToProps = dispatch => ({
  changeOldFormatModalState: (visible) => dispatch(UIActions.changeOldFormatModalState(visible)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OldFormatModal)
