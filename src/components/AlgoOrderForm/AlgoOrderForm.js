import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import { Icon } from '@blueprintjs/core'
import {NotificationManager} from 'react-notifications'

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


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)


export default class ModalForm extends PureComponent {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
    }
    this.fileName = ''
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.setState({ fileName: this.fileName })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }


  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  handleFile(e) {
    if (e.target.files[0]) { this.setState({ fileName: e.target.files[0].name }) }
  }

  handleSubmit(e) { 
    e.preventDefault()
    const {algoName, algoDesc} = e.target
    
    /* POST data to HF server (this is pseudo-code)

      const options = {
        name: algoName.value,
        description: algoDesc.value,
        file: this.state.file,
      }
      axios.('POST','some-back-url', options)

    */

    NotificationManager.success('Algo order Succesfuly added!','Success!')
    this.setState({modalIsOpen: false})
  }
  render() {
    return (
      <div>
        <button className="hfui__add-order-btn" onClick={this.openModal}>Create Algo Order</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >

          <Icon
            className='hfui__close-modal-button'
            icon='cross'
            key='cross'
            onClick={this.closeModal}
          />
          <div>Create Algo Order</div>
          <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
            <input name='algoName' type='text' placeholder='Name of algo order' />
            <input name='algoDesc' type='text' placeholder='Short description' />
            <label>
                <div className="button">{'Upload File'}</div>
                <div className="filesContainer">{this.state.fileName || ' '}</div>
                <input type='file' size='60' onChange={e => this.handleFile(e)} />
            </label>

            <input name='algo_order_submit' type='submit' value='Submit' className='hfui__add-order-btn' />
          </form>
        </Modal>
      </div>
    )
  }
}
