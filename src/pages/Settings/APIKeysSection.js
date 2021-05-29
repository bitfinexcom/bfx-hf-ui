import React, { memo } from 'react'
import PropTypes from 'prop-types'
import NavbarButton from '../../components/NavbarButton/NavbarButton'
import Input from '../../ui/Input'

const APIKeysSection = ({
  onOptionChange, apiKey, apiSecret, paperApiKey, paperApiSecret,
}) => {
  return (
    <section>
      <p className='hfui-settings__option-label'>API credentials</p>
      <div className='hfui-settings__option-description'>
        <p>Fill in to update stored values</p>
        <p>Production API Keys:</p>
      </div>
      <div className='hfui-settings__option'>
        <Input
          type='text'
          placeholder='API Key'
          onChange={value => onOptionChange(value, 'apiKey')}
          className='hfui-settings__item-list api-key'
          value={apiKey}
        />
        <Input
          type='password'
          placeholder='API Secret'
          onChange={value => onOptionChange(value, 'apiSecret')}
          className='hfui-settings__item-list api-secret'
          value={apiSecret}
        />
      </div>
      <div className='hfui-settings__option-description'>
        <p>
          <NavbarButton
            label='Paper Trading'
            external='https://support.bitfinex.com/hc/en-us/articles/900001525006-Paper-Trading-test-learn-and-simulate-trading-strategies-'
          />
      &nbsp;API Keys:
        </p>
      </div>
      <div className='hfui-settings__option'>
        <Input
          type='text'
          placeholder='Paper Trading API Key'
          onChange={value => onOptionChange(value, 'paperApiKey')}
          className='hfui-settings__item-list api-key'
          value={paperApiKey}
        />
        <Input
          type='password'
          placeholder='Paper Trading API Secret'
          onChange={value => onOptionChange(value, 'paperApiSecret')}
          className='hfui-settings__item-list api-secret'
          value={paperApiSecret}
        />
      </div>
    </section>
  )
}

APIKeysSection.propTypes = {
  onOptionChange: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
  paperApiKey: PropTypes.string.isRequired,
  paperApiSecret: PropTypes.string.isRequired,
}

export default memo(APIKeysSection)
