import React from 'react'
import _isFinite from 'lodash/isFinite'

import { Icon } from 'react-fa'
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
      <Modal onClose={onClose}>
        <div className='hfui-indicatorsettingsmodal__wrapper'>
          <h3>
            Settings:
            {humanLabel}
          </h3>
          <ul className='hfui-indicatorsettingsmodal__args'>
            {argsDef.map(def => (
              <li key={def.label}>
                <p className='hfui-indicatorsettingsmodal__args-label'>{def.label}</p>

                <Input
                  type='text'
                  value={`${argValues[def.label]}`}
                  onChange={v => this.onArgChange(def.label, v)}
                />

                <button
                  className='hfui-indicatorsettingsmodal__args-reset'
                  onClick={this.onArgReset.bind(this, def)}
                  type='button'
                >
                  reset
                </button>
              </li>
            ))}
          </ul>

          <ul className='hfui-indicatorsettingsmodal__actions'>
            <li>
              <Icon
                name='trash'
                onClick={() => {
                  onRemove(i.key)
                  onClose()
                }}
                role='button'
                tabIndex={0}
              />
            </li>
            <li>
              <Icon
                name='save'
                role='button'
                tabIndex={0}
                onClick={() => onSave(argValues)}
              />
            </li>
            <li>
              <Icon
                name='times-circle'
                role='button'
                tabIndex={0}
                onClick={onClose}
              />
            </li>
          </ul>
        </div>
      </Modal>
    )
  }
}
