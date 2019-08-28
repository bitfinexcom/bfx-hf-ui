import React from 'react'

import Modal from '../../ui/Modal'

import './style.css'

export default class LoginTAFModal extends React.PureComponent {
  render () {
    const { onLogin, onClose } = this.props

    return (
      <Modal
        className='dtc-pleaselogintafmodal__wrapper'
        onClose={onClose}
      >
        <p onClick={onLogin}>Login to access this feature</p>
      </Modal>
    )
  }
}
