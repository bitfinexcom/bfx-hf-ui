import React from 'react'

import Modal from '../../ui/Modal'
import { propTypes, defaultProps } from './LoginTAFModal.props'
import './style.css'

export default class LoginTAFModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { onLogin, onClose } = this.props

    return (
      <Modal
        className='hfui-pleaselogintafmodal__wrapper'
        onClose={onClose}
      >
        <button
          onClick={onLogin}
          type='button'
        >
          Login to access this feature
        </button>
      </Modal>
    )
  }
}
