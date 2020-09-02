import React from 'react'
import { Icon } from 'react-fa'
import detectBrowserLanguage from 'detect-browser-language'

import HFIcon from '../../ui/HFIcon'
import NavbarButton from '../NavbarButton'
import { propTypes, defaultProps } from './Navbar.props'
import i18n from './i18n.json'
import './style.css'

const lng = detectBrowserLanguage()
const dictionary = i18n[lng]
const items = [
  {
    route: '/',
    label: dictionary.tradingTerminal,
  },
  {
    route: '/data',
    label: dictionary.marketData,
  },
  {
    route: '/strategy-editor',
    label: dictionary.strategyEditor,
  },
  {
    route: '/settings',
    label: [<Icon name='cog' key='cog' />, <p key='label'>{dictionary.settings}</p>],
  },
]

export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    return (
      <div className='hfui-navbar__wrapper'>
        <HFIcon />

        <ul className='hfui-navbar__main-links'>
          {
            items.map(val => (
              <li key={val.route}>
                <NavbarButton
                  route={val.route}
                  label={val.label}
                />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
