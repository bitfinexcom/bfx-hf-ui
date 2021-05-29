import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
import { isDevEnv as devEnv } from '../../util/autologin'

const isDevEnv = devEnv()

const CheckboxesSection = ({
  onOptionChange, gaChecked, autologinChecked, updateAutoLoginState,
}) => {
  return (
    <section>
      <div className='hfui-settings__option-check ga'>
        <Checkbox
          className='hfui-settings_check'
          onChange={newState => onOptionChange(newState, 'ga')}
          label='Usage reporting'
          checked={gaChecked}
        />
      </div>

      { isDevEnv && (
        <>
          <div className='hfui-settings__option-check'>
            <Checkbox
              label='Auto-login in development mode'
              checked={autologinChecked}
              onChange={(state) => { updateAutoLoginState(state) }}
            />
          </div>
          <div className='hfui-settings__option-description'>
            <p>
              It`s not required to press the `Save` button to update the auto-login state.
              The state will be updated and saved right after you click on the checkbox.
            </p>
          </div>
        </>
      ) }
    </section>
  )
}

CheckboxesSection.propTypes = {
  onOptionChange: PropTypes.func.isRequired,
  gaChecked: PropTypes.bool.isRequired,
  autologinChecked: PropTypes.bool.isRequired,
  updateAutoLoginState: PropTypes.func.isRequired,
}

export default memo(CheckboxesSection)
