import React from 'react'
import _isFinite from 'lodash/isFinite'
import { propTypes, defaultProps } from './index.props'
import { DateRangeInput } from '@blueprintjs/datetime'
import { Select } from '@blueprintjs/select'
import { MenuItem, Button, ButtonGroup } from '@blueprintjs/core'

import './style.css'

export default class BTHeaderBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const {
      onSelectMode,
      onSelectRange,
      selectedMode,
      selectedRange,
      symbols,
      tfs,
    } = this.props

    return (
      <div className='btheaderbar__wrapper'>
        <ul>
          <li>
            <ButtonGroup>
              <Button
                icon='database'
                active={selectedMode === 'historical'}
                onClick={() => onSelectMode('historical')}
              >Historical</Button>

              <Button
                rightIcon='series-add'
                active={selectedMode === 'new'}
                onClick={() => onSelectMode('new')}
              >New</Button>
            </ButtonGroup>
          </li>
          <li>
            <DateRangeInput
              formatDate={d => d.toLocaleString()}
              parseDate={str => new Date(str)}
              value={selectedRange}
              onChange={r => onSelectRange([
                _isFinite(+r[0]) ? new Date(Math.min(+r[0], Date.now())) : null,
                _isFinite(+r[1]) ? new Date(Math.min(+r[1], Date.now())) : null,
              ])}
            />
          </li>
          <li>
            <Select
              items={symbols}
              onItemSelect={() => {}}
              itemPredicate={(query, item) => true}
              itemRenderer={(item, { handleClick, modifiers }) => {
                if (modifiers.filtered) {
                  return null
                }

                return (
                  <MenuItem
                    active={modifiers.active}
                    key={item}
                    label={item}
                    text={item}
                    onClick={handleClick}
                  />
                )
              }}
            >
              <Button
                text='BTC/USD'
                rightIcon='double-caret-vertical'
              />
            </Select>
          </li>
          <li>
            <Select
              items={tfs}
              onItemSelect={() => {}}
              itemPredicate={(query, item) => true}
              itemRenderer={(item, { handleClick, modifiers }) => {
                if (modifiers.filtered) {
                  return null
                }

                return (
                  <MenuItem
                    active={modifiers.active}
                    key={item}
                    label={item}
                    text={item}
                    onClick={handleClick}
                  />
                )
              }}
            >
              <Button
                text='1 Minute'
                rightIcon='double-caret-vertical'
              />
            </Select>
          </li>
        </ul>
      </div>
    )
  }
}
