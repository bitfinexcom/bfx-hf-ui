import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import {
  COMPONENT_TYPES, COMPONENT_LABELS,
} from '../GridLayout/GridLayout.helpers'

import { propTypes, defaultProps } from './AddLayoutComponentModal.props'
import './style.css'
import i18n from './i18n.json'

export default class AddLayoutComponentModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    componentType: COMPONENT_LABELS.CHART,
    error: '',
  }

  constructor(props) {
    super(props)

    this.onComponentTypeChange = this.onComponentTypeChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onComponentTypeChange(componentType) {
    this.setState(() => ({ componentType }))
  }

  onSubmit() {
    const { componentType } = this.state
    const { onSubmit, onClose, lang } = this.props
    const dictionary = i18n[lang]
    if (_isEmpty(componentType) || !COMPONENT_LABELS[componentType]) {
      this.setState(() => ({ error: dictionary.invalidComponent }))
      return
    }

    onSubmit(componentType)
    onClose()
  }

  render() {
    const { onClose, lang } = this.props
    const { componentType, error } = this.state
    const dictionary = i18n[lang]
    return (
      <Modal
        onClose={onClose}
        className='hfui-addlayoutcomponentmodal__wrapper'
        label={dictionary.addComponent}
        actions={(
          <Button
            green
            onClick={this.onSubmit}
            label={[
              <i key='icon' className='icon-plus' />,
              <p key='text'>{dictionary.addComponent}</p>,
            ]}
          />
        )}
      >
        <Dropdown
          value={componentType}
          onChange={this.onComponentTypeChange}
          options={Object.values(COMPONENT_TYPES).map(type => ({
            label: COMPONENT_LABELS[type],
            value: type,
          }))}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
