/* eslint-disable react/prop-types */
import React from 'react'
import Joyride from 'react-joyride'

export default function HoneyJoyride({ styles = {}, ...props }) {
  return (
    <Joyride
      continuous
      showProgress
      showSkipButton
      styles={{
        ...styles,
        options: {
          arrowColor: '#243d50',
          backgroundColor: '#243d50',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          primaryColor: '#05bc97',
          textColor: '#f2f9ff',
          zIndex: 10000,
          ...styles.options,
        },
      }}
      {...props}
    />
  )
}
