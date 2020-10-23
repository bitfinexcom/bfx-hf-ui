import React from 'react'
import ClassNames from 'classnames'
import _reverse from 'lodash/reverse'
import _max from 'lodash/max'
import _sum from 'lodash/sum'
import BigN from 'bignumber.js'

import PLNumber from '../../ui/PLNumber'
import OBSide from './OBSide'
import Spinner from '../../ui/Spinner'
import { propTypes, defaultProps } from './OrderBook.props'
import './style.css'

// Temporary restriction to suit the design mockups;
// Remove once the design can handle deep OBs
const TEMP_OB_SIDE_LENGTH_LIMIT = 12

// TODO: Unified/split views
export default class OrderBook extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  shouldComponentUpdate(nextProps) {
    let flag = false
    const { ob } = this.props
    if (ob.length !== nextProps.ob.length) {
      return true
    }
    ob.forEach((arr, index) => {
      if (JSON.stringify(arr) !== JSON.stringify(nextProps.ob[index])) {
        flag = true
      }
    })
    return flag
  }

  render() {
    const { ob: fullOB, sumAmounts, stackedView } = this.props

    if (fullOB.length === 0) {
      return (<Spinner />)
    }

    const allBids = fullOB.filter(pl => pl[1] > 0)
    const allAsks = fullOB.filter(pl => pl[1] < 0)
    const bids = allBids.slice(0, TEMP_OB_SIDE_LENGTH_LIMIT)
    const asks = allAsks.slice(allAsks.length - TEMP_OB_SIDE_LENGTH_LIMIT)

    const ob = [...asks, ...bids]
    const maxVol = _max(ob.map(pl => Math.abs(pl[1])))
    const totalBuyAmount = _sum(ob.filter(pl => pl[1] > 0).map(pl => pl[1]))
    const totalSellAmount = -1 * _sum(ob.filter(pl => pl[1] < 0).map(pl => pl[1]))
    const totalAmount = totalBuyAmount + totalSellAmount
    let remSellAmount = totalSellAmount
    let buyAmountSum = 0
    return (
      <div className={ClassNames('hfui-orderbook__wrapper', {
        stacked: stackedView,
      })}
      >
        {stackedView ? [
          <div key='header' className='hfui-orderbook__header'>
            <p>Amount</p>
            <p>Total</p>
            <p>Price</p>
          </div>,

          <ul key='ob' className='hfui-orderbook__pl-container-stacked'>
            {ob.map((pl, i) => {
              if (pl[1] > 0) {
                buyAmountSum += pl[1]
              }

              const html = []

              if (i > 0 && pl[1] > 0 && ob[i - 1][1] < 0) {
                html.push(
                  <li
                    key={`spread-${i}`} // eslint-disable-line
                    className='spread'
                    style={{
                      marginTop: `calc(100% / ${ob.length})`,
                      marginBottom: `calc(100% / ${ob.length})`,
                    }}
                  >
                    <div className='hfui-orderbook__pl-container spread'>
                      <p className='hfui-orderbook__pl-amount' />
                      <p className='hfui-orderbook__pl-total'>
                        {totalAmount.toFixed(2)}
                      </p>

                      <p className='hfui-orderbook__pl-price'>
                        {new BigN(`${ob[i - 1][0]}`).minus(new BigN(`${pl[0]}`)).toString(10)}
                      </p>

                      <div className='hfui-orderbook_pl-vol-container' />
                    </div>
                  </li>,
                )
              }

              html.push(
                <li
                  key={i} // eslint-disable-line
                  className={ClassNames('hfui-orderbook__pl', {
                    buy: pl[1] > 0,
                    sell: pl[1] < 0,
                  })}
                >
                  <div className='hfui-orderbook__pl-container'>
                    <p className='hfui-orderbook__pl-amount'>
                      {pl[1].toFixed(2)}
                    </p>

                    <p className='hfui-orderbook__pl-total'>
                      {(sumAmounts
                        ? pl[1] < 0 ? remSellAmount : buyAmountSum
                        : pl[1]).toFixed(2)}
                    </p>

                    <p className='hfui-orderbook__pl-price'>
                      <PLNumber
                        value={pl[1]}
                        prepareFunc={() => new BigN(`${pl[0]}`).toString(10)}
                      />
                    </p>

                    <div className='hfui-orderbook_pl-vol-container'>
                      <span
                        className='hfui-orderbook__pl-vol'
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
          </ul>,
        ] : [
          <div key='header-container-non-stacked' className='hfui-orderbook__header-container'>
            <div key='header-buy' className='hfui-orderbook__header hfui-orderbook__header-left'>
              <p>Amount</p>
              <p>Price</p>
            </div>
            <div key='header-sell' className='hfui-orderbook__header hfui-orderbook__header-right'>
              <p>Price</p>
              <p>Amount</p>
            </div>
          </div>,
          <div key='content-container-non-stacked' className='hfui-orderbook__side-container'>
            <OBSide
              key='ob-bids'
              levels={bids}
              sumAmounts={sumAmounts}
            />
            <OBSide
              key='ob-asks'
              levels={_reverse(asks)}
              sumAmounts={sumAmounts}
            />
          </div>,
        ]}
      </div>
    )
  }
}
