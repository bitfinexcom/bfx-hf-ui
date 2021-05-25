import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

import { propTypes, defaultProps } from './CreateNewLayoutModal.props'
import './style.css'

export default class CreateNewLayoutModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    label: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onLabelChange = this.onLabelChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLabelChange(label) {
    this.setState(() => ({ label }))
  }

  onSubmit() {
    const { label } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(label)) {
      this.setState(() => ({ error: 'Label empty' }))
      return
    }

    onSubmit(label)
    onClose()
  }

  render() {
    const { onClose, isOpen } = this.props
    const { label, error } = this.state

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className='hfui-createnewlayoutmodal__wrapper'
        label='Add Layout'
      >
        <Input
          type='text'
          placeholder='Layout Name'
          value={label}
          onChange={this.onLabelChange}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}

        <Modal.Footer>
          <Modal.Button
            primary
            onClick={this.onSubmit}
          >
            Add Layout
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
