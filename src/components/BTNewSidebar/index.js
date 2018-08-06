import React from 'react'
import _includes from 'lodash/includes'
import { Select } from '@blueprintjs/select'
import {
  Checkbox, Button, Card, Elevation, Alignment, MenuItem
} from '@blueprintjs/core'
import HFI from 'bfx-honey-framework/lib/indicators'

import Panel from '../../ui/Panel'
import './style.css'

// Pick static data from the indicators for the UI list
const indicatorList = Object.values(HFI).map(({
  label, humanLabel, id, ui, args,
}) => ({
  label,
  humanLabel,
  id,
  ui,
  args
}))

const keyForNewIndicator = (indicators, i) => {
  const { id } = i
  let suffix = 64 // 'A' - 1
  let key

  do {
    suffix += 1
    key = `${id}${String.fromCharCode(suffix)}`
  } while (!!indicators[key])

  return key
}

export default class BTNewSidebar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onAddIndicator = this.onAddIndicator.bind(this)
  }

  onAddIndicator (i) {
    const { indicators, onIndicatorUpdate } = this.props
    const key = keyForNewIndicator(indicators, i)

    onIndicatorUpdate(key, i)
  }

  render () {
    const { indicators = {} } = this.props
    const keys = Object.keys(indicators)

    console.log(indicators)

    return (
      <div className='hfui__sidebar btui__sidebar bp3-dark'>
        <Panel
          contentClassName='btui__indicator_list'
          label='Indicators'
        >
          <ul>
            {keys.map(key => {
              const i = indicators[key]

              return (
                <li key={key}>
                  <Card elevation={Elevation.ZERO}>
                    <div>
                      <h5>{i.label}</h5>

                      <Button
                        text='Color'
                        rightIcon='refresh'
                      />
                    </div>

                    <div className='btui__sidebar_inputs'>
                      {i.args.map(arg =>
                        <input
                          className='bp3-input bp3-fill'
                          type='text'
                          placeholder={arg.label}
                          dir='auto'
                        />
                      )}

                      <input
                        className='bp3-input bp3-fill'
                        type='text'
                        placeholder='Key'
                        value={key}
                        dir='auto'
                      />
                    </div>

                    <div className='btui__sidebar_mods'>
                      <Checkbox
                        checked={true}
                        label='Enabled'
                        alignIndicator={Alignment.LEFT}
                      />

                      <Button
                        text='Delete'
                        icon='trash'
                      />

                      <Button
                        text='Save'
                        icon='floppy-disk'
                        disabled
                      />
                    </div>
                  </Card>
                </li>
              )
            })}

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
