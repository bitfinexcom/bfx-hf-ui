import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Dropdown from '../../ui/Dropdown'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

import './style.css'

const mapDispatchToProps = dispatch => ({
  toggleFeedback: (status) => {
    dispatch({ type: 'UI_TOGGLE_FEEDBACK', payload: status })
  },
})

export default connect(null, mapDispatchToProps)(class FeedbackModal extends React.PureComponent {
  static propTypes = {
    toggleFeedback: PropTypes.func,
  }
  static defaultProps = {
    toggleFeedback: () => {},
  }
  state = {
    label: '',
  }

  onLabelChange(label) {
    this.setState(() => ({ label }))
  }

  render() {
    const { label } = this.state
    const { toggleFeedback } = this.props

    return (
      <Modal
        label='Feedback Modal'
        onClose={toggleFeedback}
        actions={(
          <Button
            green
            onClick={this.onSubmit}
            label={[
              <i key='icon' className='icon-sms' />,
              <p key='text'>Submit Feedback</p>,
            ]}
          />
      )}
      >
        <Dropdown
          value='Reason'
          options={[{ label: 'Reason', value: 'Reason' }]}
        />
        <Input
          className='textarea'
          value={label}
          onChange={(e) => this.onLabelChange(e)}
          placeholder='Provide your feedback here'
        />
      </Modal>
    )
  }
})
