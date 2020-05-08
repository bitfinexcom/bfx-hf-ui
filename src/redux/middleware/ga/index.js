import ua from 'universal-analytics'

const ReactGA = ua('UA-163797164-1')

export default () => {
    return store => next => (action = {}) => {
        const { type, payload = {} } = action

        switch (type) {
            case 'GA_EVENT': {
                const state = store.getState()
                const { ui = {}} = state
                const { settings = {}} = ui
                const { ga } = settings
                const { category, action } = payload
                if(ga) { 
                    ReactGA.event(category, action).send()
                }
                break
            }
            case 'GA_PAGEVIEW': {
                const state = store.getState()
                const { ui = {}} = state
                const { settings = {}} = ui
                const { ga } = settings
                const { page } = payload
                if(ga) { 
                  ReactGA.pageview(page).send()
                }
                break
            }
        } 
        next(action)
    }
}