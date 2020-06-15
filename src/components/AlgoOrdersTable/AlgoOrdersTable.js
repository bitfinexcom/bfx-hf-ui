import React from 'react'
import _capitalize from 'lodash/capitalize'
import { Icon } from 'react-fa'

import { propTypes, defaultProps } from './AlgoOrdersTable.props'
import './style.css'

export default class AlgoOrdersTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  cancelOrder(ao) {
    const { cancelOrder, authToken, gaCancelOrder } = this.props
    cancelOrder(authToken, ao)
    gaCancelOrder()
  }

  render() {
    const {
      orders = [], apiClientState,
    } = this.props

    return (
      <ul className='hfui-ao-list__wrapper'>
        {orders.map(ao => (
          <li key={ao.gid} className='hfui-ao-list__entry'>
            {apiClientState === 2 && (
              <ul className='hfui-ao-list__entry-controls'>
                <li>
                  <Icon
                    role='button'
                    tabIndex={0}
                    name='stop'
                    onClick={() => { this.cancelOrder(ao) }}
                    onKeyPress={() => { this.cancelOrder(ao) }}
                  />
                </li>
              </ul>
            )}

            <div className='hfui-ao-list__entry-row-status green' />

            <div className='hfui-ao-list__entry-row'>
              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{ao.name}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Name</p>
              </div>

              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{_capitalize(ao.exID)}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Exchange</p>
              </div>

              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{ao.args._margin ? 'Margin' : 'Exchange'}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Context</p>
              </div>

              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{new Date(+ao.gid).toLocaleString()}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Created</p>
              </div>
            </div>

            <div className='hfui-ao-list__entry-row'>
              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{ao.args.symbol}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Symbol</p>
              </div>
              <div className='hfui-ao-list__entry-row-elm'>
                <p className='hfui-ao-list__entry-row-elm-value'>{ao.label}</p>
                <p className='hfui-ao-list__entry-row-elm-label'>Label</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
