import React from 'react'
import { Icon } from 'react-fa'

export const Routes = {
  tradingTerminal: {
    pathname: '/',
    label: 'Trading Terminal',
  },
  marketData: {
    pathname: '/data',
    label: 'Market Data',
  },
  strategyEditor: {
    pathname: '/strategy-editor',
    label: 'Strategy Editor',
  },
  settings: {
    pathname: '/settings',
    label: (
      <>
        <Icon name='cog' key='cog' />
        <p key='label'>Settings</p>
      </>
    ),
  },
}
