import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Button, Intent } from '@ufx-ui/core'

import UIActions from '../../redux/actions/ui'
import { getIsPaperTrading } from '../../redux/selectors/ui'

// eslint-disable-next-line react/prop-types
const TradingMode = ({ onClose }) => {
  const dispatch = useDispatch()
  const isPaperTradingMode = useSelector(getIsPaperTrading)
  const [isPaperTrading, setIsPaperTrading] = useState(isPaperTradingMode)

  const isChanged = isPaperTradingMode !== isPaperTrading

  const onSave = () => {
    // open change trading mode modal after this modal closes
    onClose(() => dispatch(UIActions.changeTradingModeModalState(true)))
  }

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
      <Button
        intent={Intent.PRIMARY}
        small
        onClick={onSave}
        disabled={!isChanged}
      >
        Save
      </Button>
    </div>
  )
}

export default TradingMode
