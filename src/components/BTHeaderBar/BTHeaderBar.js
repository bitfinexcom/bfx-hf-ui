import React from 'react'
import _isFinite from 'lodash/isFinite'
import { propTypes, defaultProps } from './index.props'
import { DateRangeInput } from '@blueprintjs/datetime'
import { Select } from '@blueprintjs/select'
import { MenuItem, Button, ButtonGroup } from '@blueprintjs/core'

import './style.css'

const TimeFrames = {
  '1m': '1 Minute',
  '5m': '5 Minutes',
  '15m': '15 Minutes',
  '30m': '30 Minutes',
  '1h': '1 Hour',
  '3h': '3 Hours',
  '6h': '6 Hours',
  '12h': '12 Hours',
  '1D': '1 Day',
  '7D': '7 Days',
  '14D': '14 Days',
  '1M': '1 Month',
}

export default class BTHeaderBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const {
      onSelectMode,
      onSelectRange,
      onSelectTF,
      onSelectSymbol,
      selectedMode,
      selectedRange,
      selectedSymbol,
      selectedTF,
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
                minimal
              >Historical</Button>

              <Button
                rightIcon='series-add'
                active={selectedMode === 'new'}
                onClick={() => onSelectMode('new')}
                minimal
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
              onItemSelect={onSelectSymbol}
              inputProps={{ value: selectedSymbol }}
              itemPredicate={(query, item) => item.indexOf(query) !== -1}
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
                text={selectedSymbol}
                rightIcon='double-caret-vertical'
              />
            </Select>
          </li>
          <li>
            <Select
              items={tfs}
              onItemSelect={onSelectTF}
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
                    text={TimeFrames[item]}
                    onClick={handleClick}
                  />
                )
              }}
            >
              <Button
                text={TimeFrames[selectedTF]}
                rightIcon='double-caret-vertical'
              />
            </Select>
          </li>
        </ul>
      </div>
    )
  }
}
