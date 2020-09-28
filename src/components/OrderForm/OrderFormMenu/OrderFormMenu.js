import React from 'react'
import { propTypes, defaultProps } from './OrderFormMenu.props'
import './style.css'

export default class OrderFormMenu extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      atomicOrderTypes, algoOrderTypes, onSelect, dictionary,
    } = this.props

    return (
      <div className='hfui-orderformmenu__wrapper'>
        <h4>{dictionary.atomicOrders}</h4>
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

        <h4>{dictionary.algorithmicOrders}</h4>
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
