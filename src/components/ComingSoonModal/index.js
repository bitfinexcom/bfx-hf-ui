import React from 'react'

import Modal from '../../ui/Modal'

import './style.css'

export default class ComingSoonModal extends React.PureComponent {
  render () {
    return (
      <Modal className='dtc-comingsoonmodal__wrapper'>
        <p>This feature is still in development</p>
      </Modal>
    )
  }
}
