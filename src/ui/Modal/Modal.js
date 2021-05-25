import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Dialog } from '@ufx-ui/core'

import './style.css'

function Modal(props) {
  const {
    label,
    isOpen,
    onClose,
    children,
    className,
    ...rest
  } = props

  useEffect(() => {
    // focus on the first interactable element
    if (isOpen) {
      const el = document.querySelector(['input', 'button', '[role=button'].map(element => `.modal__body ${element}`).join(','))
      if (el && !document.querySelector('.modal__footer').contains(el)) {
        el.focus()
      }
    }
  }, [isOpen])

  return (
    <Dialog
      isOpen={isOpen}
      title={label}
      onClose={onClose}
      className={className}
      textAlign='left'
      {...rest}
    >
      {children}
    </Dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}

Modal.defaultProps = {
  label: '',
  className: '',
}

Modal.Footer = Dialog.Footer
Modal.Button = Dialog.Button

export default Modal
