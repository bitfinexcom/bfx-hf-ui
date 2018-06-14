import React from 'react'

import Navbar from './ui/Navbar'
import BacktestView from './pages/BacktestView'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// TODO: Extract data manipulation, use redux
export default class HFUI extends React.Component {

  render () {
    return (
      <Router>
        <div>
          <Route component={Navbar} />

          <Route path="/" component={BacktestView} />
        </div>
      </Router>
    )
  }
}
