import React, { memo } from 'react'
import PropTypes from 'prop-types'

import OrderFormModal from '../../OrderFormModal'

const UnconfiguredModal = ({ onClick, isPaperTrading }) => (
  <OrderFormModal
    title='NOT CONFIGURED'
    icon='icon-api'
    onClick={onClick}
    content={(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className='submit-keys'>
        Submit
        {isPaperTrading ? ' Paper Trading ' : ' '}
        API keys
      </a>
    )}
  />
)

UnconfiguredModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
}

export default memo(UnconfiguredModal)
