import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import Select from '../../ui/Select'

import './style.css'

export default class MarketSelect extends React.PureComponent {
  static propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    onChange: PropTypes.func.isRequired,
    markets: PropTypes.instanceOf(Array).isRequired,
    renderLabel: PropTypes.bool,
    className: PropTypes.string,
    currentMode: PropTypes.string,
    savePairs: PropTypes.func.isRequired,
    authToken: PropTypes.string.isRequired,
    favoritePairs: PropTypes.instanceOf(Array),
  }
  static defaultProps = {
    className: '',
    favoritePairs: [],
    currentMode: '',
    renderLabel: false,
  }

  favoriteSelect(pair, isPairSelected) {
    const {
      savePairs,
      authToken,
      favoritePairs = [],
      currentMode,
    } = this.props
    if (isPairSelected) {
      savePairs([...favoritePairs, pair], authToken, currentMode)
    } else {
      const filtredPairs = favoritePairs.filter(p => p !== pair)
      savePairs(filtredPairs, authToken, currentMode)
    }
  }

  render() {
    const {
      value, onChange, markets, className, renderLabel, ...otherProps
    } = this.props

    return (
      <Select
        label={renderLabel && 'Market'}
        onFavoriteSelect={(pair, isPairSelected) => this.favoriteSelect(pair, isPairSelected)}
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
