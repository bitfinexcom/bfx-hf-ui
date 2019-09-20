import React from 'react'
import _capitalize from 'lodash/capitalize'

import { propTypes, defaultProps } from './AlgoOrdersTable.props'
import './style.css'

export default class AlgoOrdersTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      cancelOrder, orders, apiClientState, authToken,
    } = this.props

    return (
      <ul className='hfui-ao-list__wrapper'>
        {orders.map(ao => (
          <li key={ao.gid} className='hfui-ao-list__entry'>
            {apiClientState === 2 && (
              <ul className='hfui-ao-list__entry-controls'>
                <li>
                  <i
                    role='button'
                    tabIndex={0}
                    className='fas fa-stop'
                    onClick={() => cancelOrder(authToken, ao)}
                    onKeyPress={() => cancelOrder(authToken, ao)}
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
