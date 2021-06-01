import React from 'react'
import _findIndex from 'lodash/findIndex'
import _size from 'lodash/size'
import _split from 'lodash/split'
import _toArray from 'lodash/toArray'
import _toString from 'lodash/toString'
import _reverse from 'lodash/reverse'

export const processBalance = (value) => {
  const str = _toString(value)
  if (!_toString(_split(value, '.')[1])) {
    return str
  }

  const size = _size(str)
  const id = _findIndex(_reverse(_toArray(str)), el => +el !== 0)

  return (
    <>
      {str.substr(0, size - id)}
      <span className='trailing-zeros'>
        {str.substr(size - id, size)}
      </span>
    </>
  )
}
