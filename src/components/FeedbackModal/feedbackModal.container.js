import { connect } from 'react-redux'

import feedbackModal from './feedbackModal.view'

const mapDispatchToProps = dispatch => ({
  toggleFeedback: (status) => {
    dispatch({ type: 'UI_TOGGLE_FEEDBACK', payload: status })
  },
})

export default connect(null, mapDispatchToProps)(feedbackModal)
