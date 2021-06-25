import React, { useCallback, memo, useMemo } from 'react'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import Dropdown from '../../ui/Dropdown'
import FavoriteIcon from '../../ui/Icons/FavoriteIcon'

import './style.css'

const MarketSelect = ({
  savePairs,
  authToken,
  favoritePairs = [],
  currentMode, value,
  onChange,
  markets,
  className,
  renderLabel,
  renderWithFavorites,
  ...otherProps
}) => {
  const favoriteSelect = useCallback((pair, isPairSelected) => {
    if (isPairSelected) {
      savePairs([...favoritePairs, pair], authToken, currentMode)
    } else {
      const filteredPairs = _filter(favoritePairs, p => p !== pair)
      savePairs(filteredPairs, authToken, currentMode)
    }
  }, [savePairs, favoritePairs])

  const sortedOptions = useMemo(() => {
    const options = _map(markets, m => ({
      label: m.uiID || `${m.base}/${m.quote}`,
      value: m.uiID,
    }), [])
    return options.sort((a, b) => _includes(favoritePairs, b.value) - _includes(favoritePairs, a.value))
  }, [favoritePairs])

  return (
    <Dropdown
      label={renderLabel ? 'Market' : undefined}
      searchable
      className={ClassNames('hfui-marketselect', className)}
      onChange={(val) => {
        onChange(_find(markets, m => m.uiID === val))
      }}
      value={value.uiID}
      options={sortedOptions}
      optionRenderer={renderWithFavorites ? (optionValue, optionLabel) => {
        const isSelected = favoritePairs.includes(optionValue)
        return (
          <div className='hfui-marketselect__option'>
            <div className='hfui-marketselect__text'>{optionLabel}</div>
            <div
              className='hfui-marketselect__icon'
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                favoriteSelect(optionValue, !isSelected)
              }}
            >
              <FavoriteIcon
                value={optionValue}
                nonFilled={!isSelected}
                isSelected={isSelected}
                selectedColor='#F7F7F9'
              />
            </div>
          </div>
        )
      } : undefined}
      {...otherProps}
    />
  )
}

MarketSelect.propTypes = {
  value: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
  markets: PropTypes.instanceOf(Array).isRequired,
  renderLabel: PropTypes.bool,
  className: PropTypes.instanceOf(Object),
  currentMode: PropTypes.string,
  savePairs: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  favoritePairs: PropTypes.instanceOf(Array),
  renderWithFavorites: PropTypes.bool,
}

MarketSelect.defaultProps = {
  className: {},
  favoritePairs: [],
  currentMode: '',
  renderLabel: false,
  renderWithFavorites: false,
}

export default memo(MarketSelect)
