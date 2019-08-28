import React from 'react'

import Modal from '../../ui/Modal'

import './style.css'

export default class UpgradeModal extends React.PureComponent {
  render () {
    const { onUpgrade, onClose } = this.props

    return (
      <Modal
        fixed
        className='dtc-upgrademodal__wrapper'
        onClose={onClose}
      >
        <p onClick={onUpgrade}>Upgrade your plan to access this feature</p>
      </Modal>
    )
  }
}
