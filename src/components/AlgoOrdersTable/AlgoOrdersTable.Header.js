import React, { memo } from 'react'

const TableHeader = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Context</th>
      <th>Created</th>
      <th>Symbol</th>
      <th>Label</th>
      <th>Actions</th>
    </tr>
  </thead>
)

export default memo(TableHeader)
