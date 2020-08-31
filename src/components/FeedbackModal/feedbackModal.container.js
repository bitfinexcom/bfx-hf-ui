import { connect } from 'react-redux'

import feedbackModal from './feedbackModal.view'

import UIActions from '../../redux/actions/ui'

const mapDispatchToProps = dispatch => ({
  toggleFeedback: (status) => {
    dispatch(UIActions.toggleFeedbackModal(status))
  },
})

export default connect(null, mapDispatchToProps)(feedbackModal)
