import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'

const DeadMenSwitch = ({ checked, onOptionChange }) => {
  return (
    <section>
      <p className='hfui-settings__option-label'>Dead Man Switch</p>
      <div className='hfui-settings__option-description'>
        <p>
          Enabling the Dead Man switch will automatically cancel all
          active orders when the application closes.
        </p>
        <p className='important'>
          <em>Disabling this should be done with caution!</em>
        </p>
        <p>
          Algorithmic orders are cancelled on application close;
          without the Dead Man switch, any atomic orders created by an
          AO will remain open, and state may be lost when the
          application is started up again.
        </p>
      </div>
      <div className='hfui-settings__option-check dms'>
        <Checkbox
          className='hfui-settings_check'
          onChange={onOptionChange}
          label='DMS'
          checked={checked}
        />
      </div>
    </section>
  )
}

DeadMenSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}

export default memo(DeadMenSwitch)
