const event = (category, action) => {
    return {
        type: 'GA_EVENT',
        payload: {
            category,
            action,
        }
    }
}

const pageview = (page) => ({
    type: 'GA_PAGEVIEW',
    payload: {
        page
    }
})

export default { event, pageview }