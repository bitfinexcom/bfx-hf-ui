import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Templates from '../StrategyEditor/templates'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'

import { propTypes, defaultProps } from './CreateNewStrategyModal.props'
import './style.css'

export default class CreateNewStrategyModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    label: '',
    error: '',
    template: 'Blank',
  }

  constructor(props) {
    super(props)

    this.onLabelChange = this.onLabelChange.bind(this)
    this.onTemplateChange = this.onTemplateChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLabelChange(label) {
    this.setState(() => ({ label }))
  }

  onTemplateChange(template) {
    this.setState(() => ({ template }))
  }

  onSubmit() {
    const { label, template } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(label)) {
      this.setState(() => ({ error: 'Label empty' }))
      return
    }

    onSubmit(label, template)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { label, error, template } = this.state

    return (
      <Modal
        onClose={onClose}
        className='dtc-createnewstrategymodal__wrapper'
      >
        <p>Create a new Strategy</p>
        <p className='notice'>Your strategy will be encrypted with a password before being sent to the server</p>

        <Input
          type='text'
          label='Label'
          value={label}
          onChange={this.onLabelChange}
        />

        <Dropdown
          label='Template'
          value={template}
          onChange={this.onTemplateChange}
          options={Templates.map(t => ({
            label: t.label,
            value: t.label,
          }))}
        />

        <Button
          label='Create'
          onClick={this.onSubmit}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
