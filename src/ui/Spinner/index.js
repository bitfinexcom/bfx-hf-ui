import React from 'react'
import './style.css'

export default class Spinner extends React.PureComponent {
  render () {
    return (
      <div className='dtc-spinner__wrapper'>
        <i className='fa fa-circle-notch' />
      </div>
    )
  }
}
