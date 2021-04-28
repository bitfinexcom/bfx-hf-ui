import React from 'react'
import './style.css'

import Navbar from '../Navbar'
import ExchangeInfoBar from '../ExchangeInfoBar'
import StatusBar from '../StatusBar'

// eslint-disable-next-line react/prop-types
export default function Layout({ authToken, children }) {
  return (
    <div className='layout'>
      {authToken && (
        <header className='header'>
          <Navbar />
          <ExchangeInfoBar
            showSave
            showAddComponent
          />
        </header>
      )}
      <main className='main'>
        {children}
      </main>
      <StatusBar
        displayLayoutControls={false}
      />
    </div>
  )
}
