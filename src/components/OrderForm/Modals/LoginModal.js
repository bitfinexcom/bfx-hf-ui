import React from 'react'

import OrderFormModal from '../OrderFormModal'

export default class LoginModal extends React.PureComponent {
  render () {
    const { onClick } = this.props

    return (
      <OrderFormModal
        icon='fas fa-user'
        onClick={onClick}
        content={(
          <p className='underline'>Login to access</p>
        )}
      />
    )
  }
}
