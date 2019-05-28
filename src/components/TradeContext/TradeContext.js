import React from 'react'
import _isObject from 'lodash/isObject'

import Panel from '../../ui/Panel'
import BacktestInfoRow from '../BacktestInfo/BacktestInfoRow'

export default class TradeContext extends React.PureComponent {
  render() {
    const { trade = {} } = this.props
    const { iv = {} } = trade
    const rows = []

    Object.keys(iv).forEach((key) => {
      if (_isObject(iv[key])) {
        Object.keys(iv[key]).forEach((cKey) => {
          rows.push({
            key: `${key}.${cKey}`,
            i: iv[key][cKey],
          })
        })
      } else {
        rows.push({
          key,
          i: iv[key],
        })
      }
    })

    return (
      <Panel label='Trade Context' contentClassName='btinfo'>
        <ul>
          {rows.map(({ key, i }) => (
            <BacktestInfoRow
              key={key}
              label={key}
              value={i}
            />
          ))}
        </ul>
      </Panel>
    )
  }
}
