import axios from 'axios'

export const api = axios.create({
  baseURL: '//localhost:45001',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

export const getSettings = (keys) => api({
  url: '/v2/auth/r/settings',
  method: 'post',
  data: {
    keys,
  },
})

export const setSettings = (settings) => api({
  url: '/v2/auth/w/settings/set',
  method: 'post',
  data: {
    settings,
  },
})

export const delSettings = (keys) => api({
  url: '/v2/auth/w/settings/del',
  method: 'post',
  data: {
    keys,
  },
})

export default {
  getSettings,
  setSettings,
  delSettings,
}
