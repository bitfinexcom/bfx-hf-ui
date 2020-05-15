import { GA_CANCEL_AO, GA_PAGEVIEW, GA_CANCEL_ATOMIC_ORDER, GA_CREATE_STRATEGY, GA_SUBMIT_AO, GA_SUBMIT_ATOMIC_ORDER, GA_UPDATE_SETTINGS } from '../constants/ga'

const cancelAO = () => {
    return { type: GA_CANCEL_AO }
}
const submitAO = () => {
    return { type: GA_SUBMIT_AO }
}
const cancelAtomicOrder = () => {
    return { type: GA_CANCEL_ATOMIC_ORDER }
}
const submitAtomicOrder = () => {
    return { type: GA_SUBMIT_ATOMIC_ORDER }
}
const updateSettings = () => {
    return { type: GA_UPDATE_SETTINGS }
}
const pageview = (page) => ({
    type: GA_PAGEVIEW,
    payload: {
        page
    }
})

const createStrategy = () => {
    return { type: GA_CREATE_STRATEGY }
}

export default { pageview, cancelAO, cancelAtomicOrder, createStrategy, submitAO, submitAtomicOrder, updateSettings }