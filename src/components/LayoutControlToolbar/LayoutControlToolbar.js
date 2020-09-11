import React from 'react'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import { propTypes, defaultProps } from './LayoutControlToolbar.props'
import './style.css'
import i18n from './i18n.json'

const dictionary = i18n['ru-RU']
export default class LayoutControlToolbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      layouts, tradingEnabled, onAddLayout, onDeleteLayout, onSaveLayout,
      onAddComponent, activeLayout, layoutDirty, onChangeLayout, activeLayoutID,
    } = this.props

    const layoutNames = Object.keys(layouts).filter(id => (
      (layouts[id].type === 'trading' && tradingEnabled)
      || (layouts[id].type === 'data' && !tradingEnabled)
    ))

    const { canDelete } = activeLayout
    const defaultLayoutID = 'Default Market Data'

    return (
      <div className='hfui-layoutcontroltoolbar__wrapper'>
        <Dropdown
          highlight
          fallback={defaultLayoutID}
          value={activeLayoutID}
          onChange={onChangeLayout}
          options={layoutNames.map(name => ({
            label: name,
            value: name,
          }))}
        />

        <Button
          onClick={onAddLayout}
          label={[
            <i key='icon' className='icon-plus' />,
            <p key='text'>{dictionary.addLayout}</p>,
          ]}
        />

        <Button
          green
          onClick={onAddComponent}
          label={[
            <i key='icon' className='icon-plus' />,
            <p key='text'>{dictionary.addComponent}</p>,
          ]}
        />

        <Button
          green={layoutDirty}
          disabled={!layoutDirty}
          onClick={onSaveLayout}
          label={[
            <i key='icon' className='icon-save' />,
            <p key='text'>{dictionary.save}</p>,
          ]}
        />

        <Button
          onClick={onDeleteLayout}
          disabled={!canDelete}
          label={[
            <i key='icon' className='icon-clear' />,
            <p key='text'>{dictionary.delete}</p>,
          ]}
        />
      </div>
    )
  }
}
