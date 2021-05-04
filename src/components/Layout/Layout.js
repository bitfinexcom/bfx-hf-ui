import React from 'react'
import './style.css'

import Navbar from '../Navbar'
import ExchangeInfoBar from '../ExchangeInfoBar'
import StatusBar from '../StatusBar'

// eslint-disable-next-line react/prop-types
function Layout({ children, ...props }) {
  return (
    <div className='layout' {...props}>
      {children}
    </div>
  )
}

// eslint-disable-next-line react/prop-types
Layout.Header = function Header({ children, ...props }) {
  return (
    <header className='header' {...props}>
      <Navbar />
      <ExchangeInfoBar
        showSave
        showAddComponent
      />
      {children}
    </header>
  )
}

// eslint-disable-next-line react/prop-types
Layout.Main = function Main({ children, ...props }) {
  return (
    <main className='main' {...props}>
      {children}
    </main>
  )
}

// eslint-disable-next-line react/prop-types
Layout.Footer = function Footer({ children }) {
  return (
    <>
      <StatusBar
        displayLayoutControls={false}
      />
      {children}
    </>
  )
}

export default Layout
