import React from 'react'
import _isFunction from 'lodash/isFunction'

import { propTypes, defaultProps } from './PLNumber.props'

export default class PLNumber extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { value, prepareFunc } = this.props
    const text = _isFunction(prepareFunc) ? prepareFunc(value) : value

    return value < 0
      ? <span className='hfui-red'>{text}</span>
      : <span className='hfui-green'>{text}</span>
  }
}
