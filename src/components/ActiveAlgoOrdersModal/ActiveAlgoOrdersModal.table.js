import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import Checkbox from '../../ui/Checkbox'

import './style.css'

const AlgoOrdersTable = ({
  orders,
  onOrderSelect,
  isOrderSelected,
  onAllOrdersSelect,
  isAllOrdersSelected,
}) => (
  <>
    <div className='hfui-ao-list__header-row'>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-symbol'>
          Action
        </p>
      </div>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-symbol'>
          Symbol
        </p>
      </div>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-name'>
          Name
        </p>
      </div>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-context'>
          Context
        </p>
      </div>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-created'>
          Created
        </p>
      </div>
      <div className='hfui-ao-list__header-row-elm'>
        <p className='hfui-ao-list__header-row-elm-label order-label'>
          Label
        </p>
      </div>
    </div>
    <div className='hfui-ao-list__wrapper'>
      <ul>
        {_map(orders, ao => {
          const selected = isOrderSelected(ao.gid)

          return (
            <li
              key={ao.gid}
              className='hfui-ao-list__entry'
              onClick={() => onOrderSelect(!selected, ao.gid, ao.algoID)}
            >
              <div className='hfui-ao-list__entry-row'>
                <div className='hfui-ao-list__entry-row-elm ao-checkbox'>
                  <Checkbox
                    value={selected}
                    onChange={e => onOrderSelect(e, ao.gid, ao.algoID)}
                  />
                </div>
                <div className='hfui-ao-list__entry-row-elm'>
                  <p className='hfui-ao-list__entry-row-elm-value'>
                    {ao.args.symbol}
                  </p>
                </div>
                <div className='hfui-ao-list__entry-row-elm'>
                  <p className='hfui-ao-list__entry-row-elm-value ao-name'>
                    {ao.name}
                  </p>
                </div>
                <div className='hfui-ao-list__entry-row-elm'>
                  <p className='hfui-ao-list__entry-row-elm-value'>
                    {ao.args._margin ? 'Margin' : 'Exchange'}
                  </p>
                </div>
                <div className='hfui-ao-list__entry-row-elm'>
                  <p className='hfui-ao-list__entry-row-elm-value'>
                    {new Date(+ao.gid).toLocaleString()}
                  </p>
                </div>
                <div className='hfui-ao-list__entry-row-elm'>
                  <p className='hfui-ao-list__entry-row-elm-value ao-label'>
                    {ao.label}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
    <div className='hfui-ao-list__footer-row'>
      <div className='hfui-ao-list__footer-row-elm ao-checkbox'>
        <Checkbox
          label='Select All'
          value={isAllOrdersSelected()}
          onChange={e => onAllOrdersSelect(e)}
        />
      </div>
    </div>
  </>
)

AlgoOrdersTable.propTypes = {
  isOrderSelected: PropTypes.func,
  isAllOrdersSelected: PropTypes.func,
  onOrderSelect: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  onAllOrdersSelect: PropTypes.func.isRequired,
}

AlgoOrdersTable.defaultProps = {
  orders: [],
  isOrderSelected: () => false,
  isAllOrdersSelected: () => false,
}

export default React.memo(AlgoOrdersTable)
