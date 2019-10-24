import React from 'react'
import { propTypes, defaultProps } from './OrderFormMenu.props'
import './style.css'

export default class OrderFormMenu extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { atomicOrderTypes, algoOrderTypes, onSelect } = this.props

    return (
      <div className='hfui-orderformmenu__wrapper'>
        <h4>Atomic Orders</h4>
        <ul>
          {atomicOrderTypes.map(type => (
            <li
              key={type.label}
              onClick={() => onSelect(type)}
            >
              <i className={`icon-${type.uiIcon}`} />
              <div>
                <p>{type.label}</p>
              </div>
            </li>
          ))}
        </ul>

        <h4>Algorithmic Orders</h4>
        <ul>
          {algoOrderTypes.map(type => (
            <li
              key={type.label}
              onClick={() => onSelect(type)}
            >
              <i className={`icon-${type.uiIcon}`} />
              <div>
                <p>{type.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
