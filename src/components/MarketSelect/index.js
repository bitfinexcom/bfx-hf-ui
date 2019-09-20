import React from 'react'
import ClassNames from 'classnames'
import Select from '../../ui/Select'

import { propTypes, defaultProps } from './MarketSelect.props'
import './style.css'

export default class MarketSelect extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      value, onChange, markets, className, ...otherProps
    } = this.props

    return (
      <Select
        className={ClassNames('hfui-marketselect', className)}
        onChange={(selection) => {
          onChange(markets.find(m => m.uiID === selection.value))
        }}

        value={{
          label: value.uiID || `${value.base}/${value.quote}`,
          value: value.uiID,
        }}

        options={markets.map(m => ({
          label: m.uiID || `${m.base}/${m.quote}`,
          value: m.uiID,
        }))}

        {...otherProps}
      />
    )
  }
}
