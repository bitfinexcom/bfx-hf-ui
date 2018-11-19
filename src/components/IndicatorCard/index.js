import React from 'react'
import _sample from 'lodash/sample'
import {
  Checkbox, Button, Card, Elevation, Alignment
} from '@blueprintjs/core'

import './style.css'

export default class IndicatorCard extends React.PureComponent {
  onCycleColor (i) { // TODO: color scheme management
    const { onSave, colors } = this.props
    i.color = `#${_sample(colors)}`
    onSave(i)
  }

  onArgChange (i, index, e) {
    const { onUpdate } = this.props
    const { value } = e.target

    i.args[index].value = value
    i.dirty = true
    onUpdate(i)
  }

  onKeyChange (i, e) {
    const { onUpdate } = this.props
    const { value } = e.target

    i.key = value
    i.dirty = true
    onUpdate(i)
  }

  onEnabledChange (i, e) {
    const { onSave } = this.props
    const { checked } = e.target

    i.enabled = checked
    onSave(i)
  }

  onDelete (i) {
    const { onDelete } = this.props
    onDelete(i)
  }

  onSave (i) {
    const { onSave } = this.props
    onSave(i)
  }

  render () {
    const { i = {} } = this.props

    return (
      <Card
        elevation={Elevation.ZERO}
        className='indicator_card__wrapper'
      >
        <div className='indicator_card__label'>
          <h5>{i.label}</h5>
          <Checkbox
            label='Enabled'
            checked={i.enabled}
            alignIndicator={Alignment.RIGHT}
            onChange={this.onEnabledChange.bind(this, i)}
          />
        </div>

        <div className='indicator_card__container'>
          <div className='indicator_card__mods'>
            <Button
              text='Color'
              rightIcon='refresh'
              className='indicator_card_color_btn'
              onClick={this.onCycleColor.bind(this, i)}
              style={{
                borderColor: i.color
              }}
            />

            <Button
              text='Delete'
              icon='trash'
              onClick={this.onDelete.bind(this, i)}
            />

            <Button
              text='Save'
              icon='floppy-disk'
              disabled={!i.dirty}
              onClick={this.onSave.bind(this, i)}
            />
          </div>

          <div className='indicator_card__inputs'>
            {i.args.map((arg, index) =>
              <div className='indicator_card__input' key={index}>
                <p>{arg.label}</p>
                <input
                  onChange={this.onArgChange.bind(this, i, index)}
                  className='bp3-input bp3-fill'
                  placeholder={arg.label}
                  value={arg.value || ''}
                  key={index}
                  type='text'
                  dir='auto'
                />
              </div>
            )}

            <div className='indicator_card__input'>
              <p>Key</p>
              <input
                onChange={this.onKeyChange.bind(this, i)}
                className='bp3-input bp3-fill'
                placeholder='Key'
                value={i.key}
                type='text'
                dir='auto'
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }
}
