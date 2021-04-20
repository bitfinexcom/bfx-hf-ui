import React, { useState, memo } from 'react'
import _isEmpty from 'lodash/isEmpty'
import _size from 'lodash/size'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import Textarea from '../../ui/Textarea'

import { REASON_TYPES, REASON_LABELS } from './FeedbackModal.helpers'

import './style.css'

const FeedbackModal = ({ onSubmit, onClose }) => {
  const [reason, setReason] = useState(REASON_TYPES.REASON_1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onFeedbackSubmit = () => {
    if (_isEmpty(reason) || !REASON_LABELS[reason]) {
      setError('Please select a valid feedback reason')
      return
    }

    if (_isEmpty(message)) {
      setError('Please write your feedback')
      return
    }

    if (_size(message) > 50) {
      setError('Your feedback message is too long')
      return
    }

    onSubmit({ reason, message })
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      className='hfui-feedback_modal'
      label='Feedback'
      actions={(
        <Button
          green
          onClick={onFeedbackSubmit}
          label='Submit'
        />
      )}
    >
      <Dropdown
        value={reason}
        label='Feedback reason'
        onChange={setReason}
        options={Object.values(REASON_TYPES).map(type => ({
          label: REASON_LABELS[type],
          value: type,
        }))}
      />

      <Textarea
        onChange={setMessage}
        label='Your feedback message'
        className='textarea'
        value={message}
      />

      {!_isEmpty(error) && (
        <p className='error'>{error}</p>
      )}
    </Modal>
  )
}

FeedbackModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default memo(FeedbackModal)
