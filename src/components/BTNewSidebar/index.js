import React from 'react'
import _includes from 'lodash/includes'
import _sample from 'lodash/sample'
import _cloneDeep from 'lodash/cloneDeep'
import { Select } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'

import HFI from 'bfx-hf-indicators'

import ID from '../../util/id'
import IndicatorCard from '../IndicatorCard'
import Panel from '../../ui/Panel'
import './style.css'

// Pick static data from the indicators for the UI list
const indicatorList = Object.values(HFI)
  .filter(({ label }) => !!label)
  .map(({
    label, humanLabel, id, ui, args
  }) => ({
    label,
    humanLabel,
    id,
    ui,
    args
  }))

// TODO: Handle edge case where A-Z is not enough (wrap around w/ AA, AB, etc)
const keyForNewIndicator = (indicators, i) => {
  const keys = indicators.map(i => i.key)
  const { id } = i
  let suffix = 64 // 'A' - 1
  let key

  do {
    suffix += 1
    key = `${id}${String.fromCharCode(suffix)}`
  } while (_includes(keys, key))

  return key
}

export default class BTNewSidebar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onAddIndicator = this.onAddIndicator.bind(this)
  }

  onAddIndicator (iTemplate) {
    const i = _cloneDeep(iTemplate)
    const { indicators, onIndicatorAdded, colors } = this.props
    const key = keyForNewIndicator(indicators, i)

    i._id = ID()
    i.key = key
    i.dirty = true // unsaved changes
    i.created = false // saved at least once
    i.enabled = false
    i.color = `#${_sample(colors)}`

    i.args.forEach((arg) => {
      arg.value = arg.default
    })

    onIndicatorAdded(i)
  }

  render () {
    const {
      colors,
      indicators,
      onIndicatorSaved,
      onIndicatorUpdated,
      onIndicatorDeleted
    } = this.props

    return (
      <div className='hfui__sidebar btui__sidebar'>
        <Panel
          contentClassName='btui__indicator_list'
          label='Indicators'
        >
          <ul>
            {indicators.map(i => (
              <li key={i._id}>
                <IndicatorCard
                  i={i}
                  colors={colors}
                  onSave={i => onIndicatorSaved(i)}
                  onUpdate={i => onIndicatorUpdated(i)}
                  onDelete={i => onIndicatorDeleted(i)}
                />
              </li>
            ))}

            <li>
              <Select
                items={indicatorList}
                onItemSelect={this.onAddIndicator}
                itemPredicate={(q, i) =>
                  _includes(i.label, q) || _includes(i.humanLabel, q)
                }

                itemRenderer={(i, { handleClick, modifiers }) => {
                  if (modifiers.filtered) {
                    return null
                  }

                  return (
                    <MenuItem
                      active={modifiers.active}
                      key={i.label}
                      label={i.label}
                      text={i.humanLabel}
                      onClick={handleClick}
                    />
                  )
                }}
              >
                <Button
                  text='Add...'
                  icon='plus'
                  minimal
                />
              </Select>
            </li>
          </ul>
        </Panel>
      </div>
    )
  }
}
