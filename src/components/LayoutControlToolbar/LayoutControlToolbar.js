import React from 'react'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import { propTypes, defaultProps } from './LayoutControlToolbar.props'
import './style.css'

export default class LayoutControlToolbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { layouts, tradingEnabled } = this.props
    const layoutNames = Object.keys(layouts).filter(id => (
      (layouts[id].type === 'trading' && tradingEnabled)
      || (layouts[id].type === 'data' && !tradingEnabled)
    ))

    const defaultLayoutID = 'Default Market Data'

    return (
      <div className='hfui-layoutcontroltoolbar__wrapper'>
        <Dropdown
          highlight
          fallback={defaultLayoutID}
          options={layoutNames.map(name => ({
            label: name,
            value: name,
          }))}
        />

        <Button
          label={[
            <i key='icon' className='fas fa-bell' />,
            <p key='text'>Add Layout</p>,
          ]}
        />

        <Button
          green
          label={[
            <i key='icon' className='fas fa-bell' />,
            <p key='text'>Add Component</p>,
          ]}
        />

        <Button
          label={[
            <i key='icon' className='fas fa-bell' />,
            <p key='text'>Save</p>,
          ]}
        />

        <Button
          label={[
            <i key='icon' className='fas fa-bell' />,
            <p key='text'>Delete</p>,
          ]}
        />
      </div>
    )
  }
}
