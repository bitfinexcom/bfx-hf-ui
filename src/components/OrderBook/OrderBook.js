import React from 'react'
import ClassNames from 'classnames'
import _reverse from 'lodash/reverse'
import _max from 'lodash/max'
import _sum from 'lodash/sum'
import BigN from 'bignumber.js'

import OBSide from './OBSide'
import Spinner from '../../ui/Spinner'
import { propTypes, defaultProps } from './OrderBook.props'
import './style.css'

// TODO: Unified/split views
export default class OrderBook extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { ob, sumAmounts, stackedView } = this.props

    if (ob.length === 0) {
      return (<Spinner />)
    }

    const bids = ob.filter(pl => pl[1] > 0)
    const asks = ob.filter(pl => pl[1] < 0)
    const maxVol = _max(ob.map(pl => Math.abs(pl[1])))
    const totalBuyAmount = _sum(ob.filter(pl => pl[1] > 0).map(pl => pl[1]))
    const totalSellAmount = -1 * _sum(ob.filter(pl => pl[1] < 0).map(pl => pl[1]))
    let remSellAmount = totalSellAmount
    let buyAmountSum = 0

    return (
      <div className={ClassNames('dtc-orderbook__wrapper', {
        stacked: stackedView,
      })}
      >
        {stackedView ? (
          <ul>
            {ob.map((pl, i) => {
              if (pl[1] > 0) {
                buyAmountSum += pl[1]
              }

              const html = []

              if (i > 0 && pl[1] > 0 && ob[i - 1][1] < 0) {
                html.push(
                  <li
                    key='spread'
                    className='spread'
                    style={{
                      height: `calc(((100% / ${ob.length + 3}) * 3) - 2px)`,
                    }}
                  >
                    <div className='dtc-orderbook__pl-container spread'>
                      <p className='dtc-orderbook__pl-amount' />

                      <p className='dtc-orderbook__pl-price'>
                        {new BigN(`${ob[i - 1][0]}`).minus(new BigN(`${pl[0]}`)).toString(10)}
                      </p>

                      <div className='dtc-orderbook_pl-vol-container noborder' />
                    </div>
                  </li>,
                )
              }

              html.push(
                <li
                  key={i} // eslint-disable-line
                  style={{
                    height: `calc(100% / ${ob.length + 3})`,
                  }}

                  className={ClassNames('dtc-orderbook__pl', {
                    buy: pl[1] > 0,
                    sell: pl[1] < 0,
                  })}
                >
                  <div className='dtc-orderbook__pl-container'>
                    <p className='dtc-orderbook__pl-amount'>
                      {(sumAmounts
                        ? pl[1] < 0 ? remSellAmount : buyAmountSum
                        : pl[1]).toFixed(2)}
                    </p>

                    <p className='dtc-orderbook__pl-price'>
                      {new BigN(`${pl[0]}`).toString(10)}
                    </p>

                    <div className='dtc-orderbook_pl-vol-container'>
                      <span
                        className='dtc-orderbook__pl-vol'
                        style={{
                          width: sumAmounts
                            ? pl[1] > 0
                              ? `${(buyAmountSum / totalBuyAmount) * 100}%`
                              : `${(remSellAmount / totalSellAmount) * 100}%`
                            : `${Math.floor((Math.abs(pl[1]) / maxVol) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </li>,
              )

              if (pl[1] < 0) {
                remSellAmount += pl[1]
              }

              return html
            })}
          </ul>
        ) : [
          <OBSide
            levels={bids}
            sumAmounts={sumAmounts}
          />,

          <OBSide
            levels={_reverse(asks)}
            sumAmounts={sumAmounts}
          />,
        ]}
      </div>
    )
  }
}
