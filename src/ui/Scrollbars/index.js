import React from 'react'
import CustomScrollbars from 'react-custom-scrollbars'

import './style.css'

export default class Scrollbars extends React.PureComponent {
  render () {
    const { children } = this.props

    return (
      <CustomScrollbars
        renderTrackVertical={props => (
          <div {...props} className="dtc-scrollbars-track-vertical"/>
        )}

        renderThumbVertical={props => (
          <div {...props} className="dtc-scrollbars-thumb-vertical"/>
        )}
      >
        {children}
      </CustomScrollbars>
    )
  }
}
