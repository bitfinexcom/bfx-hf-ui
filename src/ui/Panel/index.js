import React from 'react'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './index.props'
import './style.css'

export default class Panel extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const {
      children, label, headerStyle, contentStyle, style, headerClassName,
      contentClassName, className,
    } = this.props

    return (
      <div
        style={style}
        className={ClassNames('panel__wrapper', className)}
      >
        <div
          style={headerStyle}
          className={ClassNames('panel__header', headerClassName)}
        >
          <p>{label}</p>
        </div>

        <div
          style={contentStyle}
          className={ClassNames('panel__content', contentClassName)}
        >
          {children}
        </div>
      </div>
    )
  }
}
