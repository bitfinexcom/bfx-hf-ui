import types from '../../constants/ws'
import ReactGA from '../../../ga'

const getInitialState = () => {
  return ReactGA
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action
    
  switch (type) {   
    // case 'UPDATE_SETTINGS': {
    //     const { ga } = payload
    //     if(!payload) {
    //         return { 
    //             ...state,
    //             ReactGA: () => ({
    //                 event: ()=> {
    //                     return function send() {}
    //                 },
    //                 pageview: ()=> {
    //                     return function send() {}
    //                 },
    //             })
    //         }
    //     } else { 
            
    //     }
    // }
    default: {
      return state
    }
  }
}
