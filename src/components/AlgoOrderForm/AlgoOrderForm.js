import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import { Icon } from '@blueprintjs/core'
import { NotificationManager } from 'react-notifications'

import { store } from '../../StoreWrapper'

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    bottom: 'auto',
    width: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#161E24',
    border: 'none',
    position: 'relative',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
}

export default class ModalForm extends PureComponent {
  state = {
    modalIsOpen: false,
    fileName: '',
  }

  toggleModal() {
    const { modalIsOpen } = this.state
    this.setState({
      modalIsOpen: !modalIsOpen,
      fileName: '',
    })
  }

  handleFile(e) {
    if (e.target.files[0]) {
      const { name } = e.target.files[0]
      this.setState({ fileName: name })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { algoName, algoDesc } = e.target

    store.dispatch({
      type: 'ADD_ALGO_ORDER',
      payload: {
        algoOrder: [42, 'bfx-ping_pong', false, null, 1561361614648],
      },
    })
    NotificationManager.success('Algo order Succesfuly added!', 'Success!')
    this.toggleModal()
  }

  render() {
    const { modalIsOpen, fileName } = this.state || {}
    return (
      <div>
        <button
          type='button'
          className='hfui__add-order-btn'
          onClick={() => this.toggleModal()
         }
        >
          Create Algo Order
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <Icon
            className='hfui__close-modal-button'
            icon='cross'
            key='cross'
            onClick={() => this.toggleModal()}
          />
          <div>Create Algo Order</div>
          <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
            {/* <input name='algoName' type='text' placeholder='Name of algo order' />
            <input name='algoDesc' type='text' placeholder='Short description' />
            <label>
              <div className='button'>Upload File</div>
              <div className='filesContainer'>{fileName}</div>
              <input type='file' accept='.js' size='60' onChange={e => this.handleFile(e)} />
            </label> */}
            <input type='text' placeholder='amount btc'></input>
            <input type='text' placeholder='slice amount'></input>
            <input type='text' placeholder='AMOUNT DISTORTION %'></input>
            <input type='text' placeholder='SLICE INTERVAL (SEC)'></input>
            <input type='text' placeholder='SLICE DISTORTION %'></input>

            <input name='algo_order_submit' type='submit' value='Submit' className='hfui__add-order-btn' />
          </form>
        </Modal>
      </div>
    )
  }
}
