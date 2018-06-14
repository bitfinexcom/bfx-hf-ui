import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'

import HFUI from './hfui'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<HFUI />, document.getElementById('root'))
registerServiceWorker()
