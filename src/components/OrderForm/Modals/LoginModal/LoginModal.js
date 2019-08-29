import React from 'react'

import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './LoginModal.props'

export default class LoginModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
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
