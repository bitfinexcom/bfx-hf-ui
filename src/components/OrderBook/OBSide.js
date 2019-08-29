import React from 'react'
import ClassNames from 'classnames'
import _sum from 'lodash/sum'
import _max from 'lodash/max'
import { prepareAmount, preparePrice } from 'bfx-api-node-util'

import { propTypes, defaultProps } from './OBSide.props'

export default class OBSide extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { levels, sumAmounts } = this.props
    const amountSum = _sum(levels.map(pl => Math.abs(pl[1])))
    const maxVol = _max(levels.map(pl => Math.abs(pl[1])))
    let cumAmountSum = 0

    return (
      <ul className='dtc-orderbook__side'>
        {levels.map((pl, i) => {
          cumAmountSum += Math.abs(pl[1])

          return (
            <li
              key={i} // eslint-disable-line
              style={{ height: `calc(100% / ${levels.length})` }}
              className={ClassNames('dtc-orderbook__pl', {
                buy: pl[1] > 0,
                sell: pl[1] < 0,
              })}
            >
              <div className='dtc-orderbook__pl-container'>
                <p className='dtc-orderbook__pl-amount'>
                  {+prepareAmount(sumAmounts ? cumAmountSum : pl[1])}
                </p>

                <p className='dtc-orderbook__pl-price'>{preparePrice(pl[0])}</p>

                <div className='dtc-orderbook_pl-vol-container'>
                  <span
                    className='dtc-orderbook__pl-vol'
                    style={{
                      width: sumAmounts
                        ? `${(cumAmountSum / amountSum) * 100}%`
                        : `${Math.floor((Math.abs(pl[1]) / maxVol) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}
