import React, { memo, useEffect, useState } from 'react'
import _isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'

const textStyle = {
  verticalAlign: 'text-top',
}

const PLNumber = ({
  value, prepareFunc, ccy, isGreen,
}) => {
  const text = _isFunction(prepareFunc) ? prepareFunc(value) : value
  const [prevValue, setPrevValue] = useState(0)
  const [currentValue, setCurrentValue] = useState(prevValue)

  useEffect(() => {
    setPrevValue(currentValue)
    setCurrentValue(value)
  }, [value])

  return (
    <span className={isGreen ? 'hfui-green' : 'hfui-red'}>
      <span>
        {currentValue > prevValue ? <span>&#9650;</span> : <span>&#9660;</span>}
        &nbsp;
        <span style={textStyle}>
          {text}
          &nbsp;
          {ccy}
        </span>

      </span>
    </span>
  )
}

PLNumber.propTypes = {
  value: PropTypes.number.isRequired,
  ccy: PropTypes.string,
  prepareFunc: PropTypes.func,
  isGreen: PropTypes.bool,
}

PLNumber.defaultProps = {
  prepareFunc: null,
  ccy: '',
  isGreen: false,
}

export default memo(PLNumber)
