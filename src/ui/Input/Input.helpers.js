import _toString from 'lodash/toString'
import _split from 'lodash/split'
import _size from 'lodash/size'

export const getLengthAfterPoint = (value) => {
  const arr = _split(_toString(value), '.')

  if (_size(arr) === 2) {
    return _size(arr[1])
  }

  return 0
}
