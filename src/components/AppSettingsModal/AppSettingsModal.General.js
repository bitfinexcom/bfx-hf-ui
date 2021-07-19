import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import { Checkbox } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getActiveAlgoOrders } from '../../redux/actions/ao'
import {
  isDevEnv,
  getAutoLoginState,
  updateAutoLoginState,
} from '../../util/autologin'

const INITIAL_AUTO_LOGIN = getAutoLoginState()

const General = () => {
  const dispatch = useDispatch()
  const settingsDms = useSelector(state => _get(state, 'ui.settings.dms', null))
  const settingsGa = useSelector(state => _get(state, 'ui.settings.ga', null))
  const authToken = useSelector(getAuthToken)

  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(INITIAL_AUTO_LOGIN)
  const [isDmsChecked, setIsDmsChecked] = useState(settingsDms)
  const [isGaChecked, setIsGaChecked] = useState(settingsGa)

  useEffect(() => {
    setIsDmsChecked(settingsDms)
  }, [settingsDms])

  useEffect(() => {
    setIsGaChecked(settingsGa)
  }, [settingsGa])

  const updateDms = (nextDms) => {
    setIsDmsChecked(nextDms)
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      nextDms,
      settingsGa,
    ]))
    dispatch(getActiveAlgoOrders())
    dispatch(GAActions.updateSettings())
  }

  const updateGa = (nextGa) => {
    setIsGaChecked(nextGa)
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      settingsDms,
      nextGa,
    ]))
    dispatch(GAActions.updateSettings())
  }

  return (
    <div>
      <div className='appsettings-modal__title'>
        General
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={updateDms}
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
          onChange={updateGa}
          label='Usage reporting'
          checked={isGaChecked}
          className='appsettings-modal__checkbox'
        />
      </div>
      {isDevEnv() && (
        <div className='appsettings-modal__setting'>
          <Checkbox
            label='Auto-login in development mode'
            checked={isAutoLoginChecked}
            onChange={(value) => {
              setIsAutoLoginChecked(value)
              updateAutoLoginState(value)
            }}
            className='appsettings-modal__checkbox'
          />
          <div className='appsettings-modal__description'>
            It’s not required to press the `Save` button to update the auto-login state.
            The state will be updated and saved right after you click on the checkbox.
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(General)
