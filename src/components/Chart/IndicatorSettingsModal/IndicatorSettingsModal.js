import React from 'react'
import _isFinite from 'lodash/isFinite'

import { propTypes, defaultProps } from './IndicatorSettingsModal.props'
import Input from '../../../ui/Input'
import Modal from '../../../ui/Modal'
import './style.css'

export default class IndicatorSettingsModal extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { i = {} } = props
    const { args, argsDef } = i
    const argValues = {}

    argsDef.forEach((def, index) => {
      argValues[def.label] = args[index]
    })

    this.state = { argValues }
  }

  onArgChange(name, value) {
    this.setState(({ argValues }) => ({
      argValues: {
        ...argValues,
        [name]: _isFinite(+value) ? +value : value,
      },
    }))
  }

  onArgReset(def) {
    this.setState(({ argValues }) => ({
      argValues: {
        ...argValues,
        [def.label]: def.default,
      },
    }))
  }

  render() {
    const {
      i = {}, onClose, onSave, onRemove,
    } = this.props
    const { argValues } = this.state
    const { argsDef, humanLabel } = i

    return (
      <Modal>
        <div className='dtc-indicatorsettingsmodal__wrapper'>
          <h3>
Settings:
            {humanLabel}
          </h3>
          <ul className='dtc-indicatorsettingsmodal__args'>
            {argsDef.map(def => (
              <li key={def.label}>
                <p className='dtc-indicatorsettingsmodal__args-label'>{def.label}</p>

                <Input
                  type='text'
                  value={`${argValues[def.label]}`}
                  onChange={v => this.onArgChange(def.label, v)}
                />

                <button
                  className='dtc-indicatorsettingsmodal__args-reset'
                  onClick={this.onArgReset.bind(this, def)}
                  type='button'
                >
                  reset
                </button>
              </li>
            ))}
          </ul>

          <ul className='dtc-indicatorsettingsmodal__actions'>
            <li>
              <i
                role='button'
                tabIndex={0}
                className='fas fa-trash-alt'
                onClick={() => {
                  onRemove(i.key)
                  onClose()
                }}
              />
            </li>
            <li>
              <i
                role='button'
                tabIndex={0}
                onClick={() => onSave(argValues)}
                className='far fa-save'
              />
            </li>
            <li>
              <i
                role='button'
                tabIndex={0}
                onClick={onClose}
                className='fas fa-times-circle'
              />
            </li>
          </ul>
        </div>
      </Modal>
    )
  }
}
