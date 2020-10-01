import React from 'react'
import CustomScrollbars from 'react-custom-scrollbars'

import { propTypes, defaultProps } from './Scrollbars.props'
import './style.css'

export default class Scrollbars extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { children } = this.props

    return (
      <CustomScrollbars
        renderTrackVertical={props => (
          <div {...props} className='hfui-scrollbars-track-vertical' />
        )}
        renderThumbVertical={props => (
          <div {...props} className='hfui-scrollbars-thumb-vertical' />
        )}
      >
        {children}
      </CustomScrollbars>
    )
  }
}
