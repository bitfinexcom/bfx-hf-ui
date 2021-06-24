import React, { memo } from 'react'
import PropTypes from 'prop-types'
import NavbarButton from '../../components/Navbar/Navbar.Link'
import Input from '../../ui/Input'

const APIKeysSection = ({
  setApiKey,
  setApiSecret,
  setPaperApiKey,
  setPaperApiSecret,
  apiKey,
  apiSecret,
  paperApiKey,
  paperApiSecret,
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
          onChange={setApiKey}
          className='hfui-settings__item-list api-key'
          value={apiKey}
          autocomplete='off'
        />
        <Input
          type='password'
          placeholder='API Secret'
          onChange={setApiSecret}
          className='hfui-settings__item-list api-secret'
          value={apiSecret}
          autocomplete='off'
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
          onChange={setPaperApiKey}
          className='hfui-settings__item-list api-key'
          value={paperApiKey}
          autocomplete='off'
        />
        <Input
          type='password'
          placeholder='Paper Trading API Secret'
          onChange={setPaperApiSecret}
          className='hfui-settings__item-list api-secret'
          value={paperApiSecret}
          autocomplete='off'
        />
      </div>
    </section>
  )
}

APIKeysSection.propTypes = {
  setApiKey: PropTypes.func.isRequired,
  setApiSecret: PropTypes.func.isRequired,
  setPaperApiKey: PropTypes.func.isRequired,
  setPaperApiSecret: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
  paperApiKey: PropTypes.string.isRequired,
  paperApiSecret: PropTypes.string.isRequired,
}

export default memo(APIKeysSection)
