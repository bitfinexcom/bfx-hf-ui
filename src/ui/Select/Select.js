import React from 'react'
import ClassNames from 'classnames'
import RSelect from 'react-select'
import FavoriteIcon from '../Icons/FavoriteIcon'
import { propTypes, defaultProps } from './Select.props'
import './style.css'

const customOption = (componentProps, onFavoriteSelect, favoritePairs = []) => {
  const { innerProps, children, data } = componentProps
  const { value } = data
  const isSelected = favoritePairs.includes(value)
  return (
    <div className='hfui-market__option-container'>
      <div className='hfui-market__option-pair' {...innerProps}>
        {children}
      </div>
      <FavoriteIcon value={value} nonFilled={!isSelected} isSelected={isSelected} selectedColor='#F7F7F9' onClick={(a, b) => onFavoriteSelect(a, b)} />
    </div>
  )
}
export default class Select extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const {
      onChange, value, options, className, disabled, isDisabled, label, onFavoriteSelect, favoritePairs = [], renderWithFavorites,
      ...otherProps
    } = this.props
    if (!renderWithFavorites) {
      return (
        <div className='hfui-select__outer'>
          {label && (
            <p>
              {label}
            </p>
          )}
          <RSelect
            className={ClassNames('hfui-select', className)}
            isDisabled={disabled || isDisabled}
            classNamePrefix='hfui-select'
            onChange={onChange}
            maxMenuHeight={200}
            value={value}
            options={options}
            {...otherProps}
          />
        </div>
      )
    }
    const sortedOptions = options.sort((a, b) => favoritePairs.includes(b.value) - favoritePairs.includes(a.value))
    return (
      <div className='hfui-select__outer'>
        {label && (
          <p>
            {label}
          </p>
        )}
        <RSelect
          className={ClassNames('hfui-select', className)}
          isDisabled={disabled || isDisabled}
          classNamePrefix='hfui-select'
          onChange={onChange}
          maxMenuHeight={200}
          value={value}
          options={sortedOptions}
          {...otherProps}
          components={{
            Option: (props) => customOption(props, onFavoriteSelect, favoritePairs),
          }}
        />
      </div>
    )
  }
}
