import React, { memo } from 'react'
import _map from 'lodash/map'
import PropTypes from 'prop-types'

import './style.css'

const OrderFormMenu = ({ atomicOrderTypes, algoOrderTypes, onSelect }) => (
  <div className='hfui-orderformmenu__wrapper'>
    <h4>Atomic Orders</h4>
    <ul>
      {_map(atomicOrderTypes, type => (
        <li key={type.label} onClick={() => onSelect(type)}>
          <i className={`icon-${type.uiIcon}`} />
          <div>{type.label}</div>
        </li>
      ))}
    </ul>

    <h4>Algorithmic Orders</h4>
    <ul>
      {_map(algoOrderTypes, type => (
        <li key={type.label} onClick={() => onSelect(type)}>
          <i className={`icon-${type.uiIcon}`} />
          <div>
            <p>{type.label}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

OrderFormMenu.propTypes = {
  atomicOrderTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  algoOrderTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default memo(OrderFormMenu)
