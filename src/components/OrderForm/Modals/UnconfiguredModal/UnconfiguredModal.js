import React from 'react'
import _capitalize from 'lodash/capitalize'

import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './UnconfiguredModal.props'

export default class UnconfiguredModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { onClick, exID } = this.props

    return (
      <OrderFormModal
        title='NOT CONFIGURED'
        icon='fas fa-cogs'
        onClick={onClick}
        content={[
          <p key='a' className='underline'>
Submit API keys for
            {_capitalize(exID)}
          </p>,
          <p key='b' className='notice'>NOTE: Your API keys are encrypted with a password before being sent to the server. The password is required before executing orders or strategies utilizing the API keys.</p>,
        ]}
      />
    )
  }
}
