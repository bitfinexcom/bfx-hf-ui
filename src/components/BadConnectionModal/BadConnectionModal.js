import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

const BadConnection = ({ changeBadInternetConnectionState, visible }) => {
  const onClose = () => {
    changeBadInternetConnectionState(false)
  }

  const onSubmit = () => {
    location.replace('/index.html') // eslint-disable-line
  }

  return (
    <Modal
      label='Connection issue'
      isOpen={visible}
      onClose={onClose}
    >
      <p>We&apos;ve noticed several internet connection issues. It&apos;s required to reboot the app to continue normal operation.</p>
      <p>Please make sure you have stable and good internet connection.</p>
      <br />
      <p>The Honey Framework will reboot after you press &apos;Okay&apos;.</p>
      <Modal.Footer>
        <Modal.Button
          primary
          onClick={onSubmit}
        >
          Okay
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  )
}

BadConnection.propTypes = {
  changeBadInternetConnectionState: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default memo(BadConnection)
