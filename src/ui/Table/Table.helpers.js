import _isFunction from 'lodash/isFunction'
import _get from 'lodash/get'

export const getTransformers = (columns = []) => {
  const transformers = {}

  columns.forEach((col) => {
    if (col.dataKey && col.transformData) {
      transformers[col.dataKey] = col.transformData
    }
  })

  return transformers
}

export const getSortKeys = (columns = []) => {
  const sortKeys = {}

  columns.forEach((col) => {
    if (col.sortKey) {
      sortKeys[col.dataKey] = col.sortKey
    }
  })

  return sortKeys
}

export const getSortFunctions = (columns = []) => {
  const sortFunctions = {}

  columns.forEach((col) => {
    if (col.sortKey) {
      sortFunctions[col.dataKey] = col.sortKey
    }
  })

  return sortFunctions
}

/**
 * Returns a sorted copy of the provided dataset; values are cast to strings
 * before comparison via localeCompare(). The transformers map is optional,
 * and can be used to process field values before casting/comparison.
 *
 * @param {Object} params
 * @param {string} params.sortBy - used as key into transformers map
 * @param {string} params.sortDirection
 * @param {Array} params.data
 * @param {Object} params.transfomers - data transform functions, key'ed by col
 * @return {Array} sortedData
 */
export const getSortedData = (args = {}) => {
  const {
    data, sortBy, sortDirection, columns,
  } = args

  const transformers = getTransformers(columns)
  const sortKeys = getSortKeys(columns)
  const sortFunctions = getSortFunctions(columns)
  const transform = transformers[sortBy] || (v => v)
  const sortedData = [...data] // note copy
  const asc = sortDirection === 'ASC'
  const key = sortKeys[sortBy] || sortBy

  sortedData.sort((aRow = {}, bRow = {}) => {
    const a = transform(_get(aRow, key), aRow)
    const b = transform(_get(bRow, key), bRow)

    if (_isFunction(sortFunctions[key])) {
      return sortFunctions[key](a, b)
    }

    if (!Number.isNaN(+a) && !Number.isNaN(+b)) {
      return asc ? (+a) - (+b) : (+b) - (+a)
    }

    return asc
      ? (`${a}`).localeCompare(b)
      : (`${b}`).localeCompare(a)
  })

  return sortedData
}

export function sortData(args = {}, props = {}) {
  const { getSortedData: getData, sortedDataPostProcessor } = props
  const sortedData = getData(args)

  sortedDataPostProcessor(sortedData)

  return sortedData
}
