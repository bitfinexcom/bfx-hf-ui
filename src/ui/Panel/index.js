import React from 'react'
import './style.css'

export default class Panel extends React.PureComponent {
  render () {
    const { label, children, style } = this.props

    return (
      <div className='panel__wrapper'>
        <div className='panel__header'>
          <p>{label}</p>
        </div>

        <div className='panel__content' style={style}>
          {children}
        </div>
      </div>
    )
  }
}
