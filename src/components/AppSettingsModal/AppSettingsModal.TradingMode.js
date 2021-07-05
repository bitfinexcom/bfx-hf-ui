import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import { Checkbox, Button } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
import { getCurrentMode } from '../../redux/selectors/ui'
import { isDevEnv as devEnv } from '../../util/autologin'

// import NavbarButton from '../../Navbar/Navbar.Link'
import Input from '../../ui/Input'

const isDevEnv = devEnv()

const TradingMode = ({ checked, onOptionChange }) => {
  const [isPaperTrading, setIsPaperTrading] = useState(true)

  return (
    <div>
      <div className='appsettings-modal__title'>
        Trading Mode
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={() => setIsPaperTrading(!isPaperTrading)}
          label='Paper Trading'
          checked={isPaperTrading}
          className='appsettings-modal__checkbox'
        />
        <div className='appsettings-modal__description'>
          Practice trading without risking real money.
        </div>
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={() => setIsPaperTrading(!isPaperTrading)}
          label='Live Trading'
          checked={!isPaperTrading}
          className='appsettings-modal__checkbox'
        />
      </div>
    </div>
  )
}

TradingMode.propTypes = {
  checked: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}

export default memo(TradingMode)
