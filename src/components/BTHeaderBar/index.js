import React from 'react'
import { propTypes, defaultProps } from './index.props'
import { DateRangeInput } from '@blueprintjs/datetime'
import { Select } from '@blueprintjs/select'
import { MenuItem, Button, ButtonGroup } from '@blueprintjs/core'

import './style.css'

export default class BTHeaderBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render () {
    const markets = ['BTC/USD', 'ETH/USD']

    return (
      <div className='btheaderbar__wrapper'>
        <ul>
          <li>
            <ButtonGroup>
              <Button icon='database' active>Historical</Button>
              <Button rightIcon='series-add'>New</Button>
            </ButtonGroup>
          </li>
          <li>
            <DateRangeInput
              formatDate={d => d.toLocaleString()}
              onChange={console.log}
              parseDate={str => new Date(str)}
            />
          </li>
          <li>
            <Select
              items={markets}
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
              items={markets}
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
