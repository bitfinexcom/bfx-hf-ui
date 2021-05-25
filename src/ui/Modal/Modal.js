import React from 'react'
import PropTypes from 'prop-types'

import { Dialog } from '@ufx-ui/core'

import './style.css'

export default class Modal extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  }

  static defaultProps = {
    label: '',
    actions: [],
    className: '',
  }

  render() {
    const {
      label,
      isOpen,
      onClose,
      actions,
      children,
      className,
    } = this.props

    return (
      <Dialog
        isOpen={isOpen}
        title={label}
        onClose={onClose}
        className={className}
      >
        {children}
        {actions && (
          <Dialog.Footer>
            {actions}
          </Dialog.Footer>
        )}
      </Dialog>
    )
  }

  // render() {
  //   const {
  //     fixed,
  //     label,
  //     onClose,
  //     actions,
  //     children,
  //     className,
  //   } = this.props

  //   return (
  //     <div
  //       className={ClassNames('hfui-modal__wrapper', { fixed })}
  //       onClick={(e) => {
  //         e.stopPropagation()
  //         return false
  //       }}
  //     >
  //       <div
  //         className={ClassNames('hfui-modal__content', className)}
  //         onClick={(e) => {
  //           e.stopPropagation()
  //           return false
  //         }}
  //       >
  //         <div className='hfui-modal__header'>
  //           {label && (
  //             <p className='hfui-modal__label'>{label}</p>
  //           )}

  //           <i
  //             className='icon-cancel'
  //             onClick={onClose}
  //           />
  //         </div>

  //         {children}

  //         {actions && (
  //           <div className='hfui-modal__actions'>
  //             {actions}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   )
  // }
}
