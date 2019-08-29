// Makes react-stockcharts e.preventDefault() work in EventCapture.js
// (new issue in latest chrome (tested 77, but present earlier))
// https://github.com/facebook/react/issues/14856#issuecomment-479207136
const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel']

const originalAddEventListener = document.addEventListener.bind()
document.addEventListener = (type, listener, options, wantsUntrusted) => {
  let modOptions = options
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      }
    } else if (typeof options === 'object') {
      modOptions = {
        ...options,
        passive: false,
      }
    }
  }

  return originalAddEventListener(type, listener, modOptions, wantsUntrusted)
}

const originalRemoveEventListener = document.removeEventListener.bind()
document.removeEventListener = (type, listener, options) => {
  let modOptions = options
  if (EVENTS_TO_MODIFY.includes(type)) {
    if (typeof options === 'boolean') {
      modOptions = {
        capture: options,
        passive: false,
      }
    } else if (typeof options === 'object') {
      modOptions = {
        ...options,
        passive: false,
      }
    }
  }
  return originalRemoveEventListener(type, listener, modOptions)
}
