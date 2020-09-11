import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

import { propTypes, defaultProps } from './CreateNewLayoutModal.props'
import i18n from './i18n.json'
import './style.css'

const dictionary = i18n['ru-RU']
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
      this.setState(() => ({ error: dictionary.labelEmpty }))
      return
    }

    onSubmit(label)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { label, error } = this.state

    return (
      <Modal
        onClose={onClose}
        className='hfui-createnewlayoutmodal__wrapper'
        label={dictionary.addLayout}
        actions={(
          <Button
            green
            onClick={this.onSubmit}
            label={[
              <i key='icon' className='icon-plus' />,
              <p key='text'>{dictionary.addLayout}</p>,
            ]}
          />
        )}
      >
        <Input
          type='text'
          placeholder={dictionary.layoutName}
          value={label}
          onChange={this.onLabelChange}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
