import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import { Checkbox, Button, Intent } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'
import { isDevEnv as devEnv } from '../../util/autologin'

const isDevEnv = devEnv()

const General = ({ checked, onOptionChange }) => {
  const dispatch = useDispatch()
  const settingsDms = useSelector(state => _get(state, 'settings.dms', null))
  const settingsGa = useSelector(state => _get(state, 'settings.ga', null))
  const authToken = useSelector(getAuthToken)
  const currentMode = useSelector(getCurrentMode)

  const [isDmsChecked, setIsDmsChecked] = useState(settingsDms)
  const [isGaChecked, setIsGaChecked] = useState(settingsGa)

  // updateSettings: ({
  //   authToken, dms, ga,
  // }) => {
  //   dispatch(WSActions.send([
  //     'settings.update',
  //     authToken,
  //     dms,
  //     ga,
  //   ]))
  // },

  useEffect(() => {
    setIsDmsChecked(settingsDms)
  }, [settingsDms])

  useEffect(() => {
    setIsGaChecked(settingsGa)
  }, [settingsGa])

  return (
    <div>
      <div className='appsettings-modal__title'>
        General
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={() => setIsDmsChecked(!isDmsChecked)}
          label='Dead Man Switch'
          checked={isDmsChecked}
          className='appsettings-modal__checkbox'
        />
        <div className='appsettings-modal__description'>
          <p>
            Enabling the Dead Man switch will automatically cancel all
            active orders when the application closes.
          </p>
          <p>
            Algorithmic orders are cancelled on application close;
            without the Dead Man switch, any atomic orders created by an
            AO will remain open, and state may be lost when the
            application is started up again.
          </p>
          <div className='appsettings-modal__warning'>
            Disabling this should be done with caution!
          </div>
        </div>
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={() => setIsGaChecked(!isGaChecked)}
          label='Usage reporting'
          checked={isGaChecked}
          className='appsettings-modal__checkbox'
        />
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          label='Auto-login in development mode'
          checked
          onChange={() => {}}
          className='appsettings-modal__checkbox'
        />
        <div className='appsettings-modal__description'>
          It’s not required to press the `Save` button to update the auto-login state.
          The state will be updated and saved right after you click on the checkbox.
        </div>
      </div>
      <Button intent={Intent.PRIMARY} small>
        Save
      </Button>
    </div>
  )
}

General.propTypes = {
  checked: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}

export default memo(General)
