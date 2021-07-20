import React from 'react'
import Panel from '../../ui/Panel'

import './style.css'

const LoadingPanel = ({ dark }) => (
  <Panel
    dark={dark}
    darkHeader={dark}
    className='loading-panel'
  />
)

export default LoadingPanel
