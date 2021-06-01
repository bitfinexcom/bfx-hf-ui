import { isValid } from 'date-fns'

export const isValidDate = (date) => isValid(new Date(date))
