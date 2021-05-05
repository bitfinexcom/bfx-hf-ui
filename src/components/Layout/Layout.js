import React from 'react'
import cx from 'classnames'
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
Layout.Header = function Header({ children, buttons, ...props }) {
  return (
    <header className='header' {...props}>
      <Navbar />
      <ExchangeInfoBar buttons={buttons} />
      {children}
    </header>
  )
}

Layout.Main = function Main({
  // eslint-disable-next-line react/prop-types
  children, flex, noSpaceTop, ...props
}) {
  const className = cx('main', {
    'is-flex': flex,
    'no-space-top': noSpaceTop,
  })

  return (
    <main className={className} {...props}>
      {children}
    </main>
  )
}

// eslint-disable-next-line react/prop-types
Layout.Footer = function Footer({ children }) {
  return (
    <>
      <StatusBar />
      {children}
    </>
  )
}

export default Layout
