import axios from 'axios'
import endpoints from '../config/endpoints'
import {
  APOD_COMMAND,
  ASTEROIDS_FEED_COMMAND,
  ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.params = {
  api_key: import.meta.env.VITE_API_KEY
}

const ApiService = {
  async Apod(params = {}) {
    return await axios.get(endpoints[APOD_COMMAND], {params: params})
  },

  async AsteroidsFeed(params = {}) {
    return await axios.get(endpoints[ASTEROIDS_FEED_COMMAND], {params: params})
  },

  async AsteroidsLookup(params = {}) {
    return await axios.get(endpoints[ASTEROIDS_LOOKUP_COMMAND], {params: params})
  }
}

export default ApiService
