import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './index.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'

import HFUI from './hfui'
import registerServiceWorker from './registerServiceWorker'

const App = () => (
  <Router>
    <div className="sans-serif">
      <Route path="/" component={HFUI} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker()
