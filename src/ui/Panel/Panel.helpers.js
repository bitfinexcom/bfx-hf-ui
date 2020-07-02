import React from 'react'

const getTabs = (children) => React.Children
  .toArray(children)
  .filter(c => c && c.props.tabtitle)

export { getTabs }
